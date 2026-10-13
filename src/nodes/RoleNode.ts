import type { RbacNode } from '../core/types';

/**
 * Композит — роль, которая содержит другие роли и разрешения.
 * Пример: 'admin' содержит 'user' и разрешение 'admin.panel'.
 *
 * Наследование:
 *  - Роль наследует ВСЕ разрешения своих детей.
 *  - Проверка hasPermission() рекурсивно идёт вниз по дереву.
 */
export class RoleNode implements RbacNode {
  kind = 'role' as const;
  children: RbacNode[] = [];

  /**
   * @param name Имя роли.
   */
  constructor(public readonly name: string) {}

  /**
   * Добавить дочерний узел (роль или разрешение).
   * @param node Дочерний узел.
   * @returns this — для цепочек.
   */
  add(node: RbacNode): this {
    this.children.push(node);
    return this;
  }

  /**
   * Рекурсивно проверяет, содержит ли роль разрешение.
   * @param permission Имя разрешения.
   * @returns true, если хотя бы один ребёнок вернул true.
   */
  hasPermission(permission: string): boolean {
    return this.children.some(child => child.hasPermission(permission));
  }

  /**
   * Рекурсивно собирает все разрешения в поддереве.
   * @returns Массив уникальных имён разрешений.
   */
  getAllPermissions(): string[] {
    const result = new Set<string>();

    const walk = (node: RbacNode): void => {
      if (node.kind === 'permission') {
        result.add(node.name);
      } else if (node.children) {
        node.children.forEach(walk);
      }
    };

    walk(this);
    return Array.from(result);
  }

  /**
   * Найти дочерний узел по имени (для наглядности).
   */
  find(name: string): RbacNode | undefined {
    return this.children.find(c => c.name === name);
  }
}
