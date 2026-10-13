import type { RbacNode } from '../core/types';

/**
 * Лист дерева — конкретное разрешение.
 * Пример: 'user.read', 'post.delete'.
 */
export class PermissionNode implements RbacNode {
  kind = 'permission' as const;

  /**
   * @param name Уникальное имя разрешения.
   */
  constructor(public readonly name: string) {}

  /**
   * Лист содержит только себя.
   * @returns true, если permission === name.
   */
  hasPermission(permission: string): boolean {
    return this.name === permission;
  }

  /**
   * Лист возвращает массив из одного элемента — самого себя.
   */
  getAllPermissions(): string[] {
    return [this.name];
  }
}
