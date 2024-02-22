type NavLinkUrl = '/dashboard' | '/projects' | '/tasks' | '/users' | '/team';
type NavLinkTitle = 'Dashboard' | 'Projects' | 'Tasks' | 'Users' | 'Delete Team';

export interface NavLink {
  url: NavLinkUrl;
  title: NavLinkTitle;
  icon: string;
}
