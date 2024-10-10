import { Component ,signal} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Member } from '../../core/models/member.model';
import { MemberService } from '../../core/store/Signals/member.service';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent {
  memberForm: FormGroup;
  members = signal<Member[]>([]);
  isEditMode = false;
  currentMemberId?: number;

  constructor(private fb: FormBuilder, private memberService: MemberService) {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.members.set(this.memberService.membersSignal());

    this.updateMembers();
  }

  updateMembers() {
    this.members.set(this.memberService.membersSignal());
  }

  onSubmit() {
    if (this.isEditMode) {
      this.memberService.updateMember({
        id: this.currentMemberId!,
        ...this.memberForm.value,
      });
    } else {
      this.memberService.addMember(this.memberForm.value);
    }
    this.resetForm();
    this.updateMembers();
  }

  editMember(member: Member) {
    this.currentMemberId = member.id;
    this.isEditMode = true;
    this.memberForm.patchValue(member);
  }

  deleteMember(id: number) {
    this.memberService.deleteMember(id);
    this.updateMembers();
  }

  resetForm() {
    this.memberForm.reset();
    this.isEditMode = false;
    this.currentMemberId = undefined;
  }
}
