import { Injectable, signal } from '@angular/core';
import { Member } from '../../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private members = signal<Member[]>([]);
  private currentId = 1;

  constructor() {}

  get membersSignal() {
    return this.members;
  }

  addMember(member: Member): void {
    member.id = this.currentId++;
    this.members.update((currentMembers) => [...currentMembers, member]);
  }

  updateMember(updatedMember: Member): void {
    this.members.update((currentMembers) =>
      currentMembers.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
  }

  deleteMember(id: number): void {
    this.members.update((currentMembers) =>
      currentMembers.filter((member) => member.id !== id)
    );
  }
}
