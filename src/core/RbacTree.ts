import type { RbacNode } from './types';

/**
 * Обёртка над деревом ролей.
 * Позволяет быстро проверять права и собирать разрешения.
 */
export class RbacTree {
  constructor(private readonly root: RbacNode) {}

  /**
   * Проверить разрешение во всём дереве.
   */
  hasPermission(permission: string): boolean {
    return this.root.hasPermission(permission);
  }

  /**
   * Собрать все разрешения дерева.
   */
  getAllPermissions(): string[] {
    return this.root.getAllPermissions();
  }

  /**
   * Получить корневую роль.
   */
  getRoot(): RbacNode {
    return this.root;
  }
}
