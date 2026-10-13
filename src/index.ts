import { RoleNode } from './nodes/RoleNode';
import { PermissionNode } from './nodes/PermissionNode';
import { RbacTree } from './core/RbacTree';

/* ==================== Построение дерева ==================== */
/*
  admin
  ├── user
  │   ├── post.read
  │   └── post.comment
  ├── moderator
  │   ├── post.delete
  │   └── user.ban
  └── admin.panel
*/

const userRole = new RoleNode('user')
  .add(new PermissionNode('post.read'))
  .add(new PermissionNode('post.comment'));

const moderatorRole = new RoleNode('moderator')
  .add(new PermissionNode('post.delete'))
  .add(new PermissionNode('user.ban'));

const adminRole = new RoleNode('admin')
  .add(userRole)
  .add(moderatorRole)
  .add(new PermissionNode('admin.panel'));

const tree = new RbacTree(adminRole);

/* ==================== Проверки ==================== */
const lines: string[] = [];

lines.push('=== Дерево ролей ===');
lines.push(JSON.stringify({
  role: 'admin',
  children: [
    { role: 'user', permissions: ['post.read', 'post.comment'] },
    { role: 'moderator', permissions: ['post.delete', 'user.ban'] },
    { permission: 'admin.panel' },
  ],
}, null, 2));

lines.push('');
lines.push('=== Проверки разрешений ===');

const checks = [
  'post.read',
  'post.comment',
  'post.delete',
  'user.ban',
  'admin.panel',
  'unknown.permission',
];

checks.forEach(p => {
  lines.push(`hasPermission("${p}") → ${tree.hasPermission(p)}`);
});

lines.push('');
lines.push('=== Все разрешения admin ===');
tree.getAllPermissions().forEach(p => lines.push(`  • ${p}`));

lines.push('');
lines.push('=== Проверка user-роли отдельно ===');
lines.push(`user.hasPermission("post.read") → ${userRole.hasPermission('post.read')}`);
lines.push(`user.hasPermission("admin.panel") → ${userRole.hasPermission('admin.panel')}`);

/* ==================== Вывод ==================== */
const output = document.getElementById('output');
if (output) {
  output.textContent = lines.join('\n');
}

console.log(lines.join('\n'));
