import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoggedInUser } from 'src/types/logged-in-user';

type Method = 'GET' | 'DELETE' | 'POST' | 'PUT';
type ItemType = 'projects' | 'tasks' | 'users' | 'comments' | 'teams';
type RequiredAuthLevels = Record<Method, number>;
type AuthLevelMap = Record<ItemType, RequiredAuthLevels>;

/*
Base Authorisation level rules
All users - all GET endpoints
level 1 - Base User - Can only edit taks assigned to them and post comments
level 2 - Project Manager - Can edit/create all tasks and projects
level 3 - Admin - Can edit/create everything except for anything relating to the Master Admin
level 4 - Master Admin - Has full access to everything. Only user that can delete the team
*/
const authLevelMap: AuthLevelMap = {
  projects: { GET: 1, DELETE: 2, POST: 2, PUT: 2 },
  tasks: { GET: 1, DELETE: 2, POST: 2, PUT: 1 },
  users: { GET: 1, DELETE: 3, POST: 3, PUT: 3 },
  comments: { GET: 1, DELETE: 0, POST: 1, PUT: 0 },
  teams: { GET: 0, DELETE: 4, POST: 0, PUT: 0 },
};

@Directive({
  selector: '[appAuthLevelCheck]',
  standalone: true,
})
export class AuthLevelCheckDirective implements OnInit {
  @Input() method: Method;
  @Input() itemType: ItemType;
  @Input() targetId: number | string | undefined | null;
  @Input() targetIsMasterAdmin: boolean | undefined;
  @Input() hideMethod: 'visibility:hidden' | 'display:none' = 'visibility:hidden';
  userAuthLevel: number;
  userId: number;

  constructor(private authService: AuthService, private el: ElementRef) {}

  ngOnInit(): void {
    this.setUserValues();
    this.checkIfHideElement();
  }

  setUserValues(): void {
    const { userId, authLevel } = this.authService.loggedInUser as LoggedInUser;
    this.userAuthLevel = authLevel;
    this.userId = userId;
  }

  checkIfHideElement(): void {
    if (!this.checkIfAuthorised()) {
      const [styleProperty, value] = this.hideMethod.split(':');
      this.el.nativeElement.style[styleProperty] = value;
    }
  }

  checkIfAuthorised(): boolean {
    let isAuthorised = false;
    isAuthorised = this.checkAuthLevelMap();
    // check if a base user is trying to edit a task they are not assigned to
    if (this.itemType === 'tasks') isAuthorised = this.checkCanEditTask();
    // check if the target user being changed is the master admin. Only the master admin can edit themselves
    if (this.targetIsMasterAdmin) isAuthorised = this.checkCanEditMasterAdmin();

    return isAuthorised;
  }

  checkAuthLevelMap(): boolean {
    const requiredAuthLevel = authLevelMap[this.itemType][this.method];

    return requiredAuthLevel <= this.userAuthLevel;
  }

  checkCanEditTask(): boolean {
    if (this.userAuthLevel > 1) return true;
    if (this.method === 'PUT') {
      return this.targetId === this.userId;
    }

    return false;
  }

  checkCanEditMasterAdmin(): boolean {
    return this.userAuthLevel === 4;
  }
}
