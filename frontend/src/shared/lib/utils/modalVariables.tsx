import { GroupCreateModal } from "@/features/modals/ui/groupCreateModal";
import { GroupInviteModal } from "@/features/modals/ui/groupInviteModal";
import { GroupKickModal } from "@/features/modals/ui/groupKickModal";
import { GroupLeaveModal } from "@/features/modals/ui/groupLeaveModal";
import { LessonDeleteModal } from "@/features/modals/ui/lessonDeleteModal";
import { ScheduleAcceptModal } from "@/features/modals/ui/scheduleAcceptModal";
import { UniversityModal } from "@/features/modals/ui/universityModal";
import { WelcomeModal } from "@/features/modals/ui/welcomeModal";
import { JSX } from "react";

export const enum EModalVariables {
  WELCOME_MODAL = "welcome-modal",
  UNIVERSITY_MODAL = "university-modal",
  GROUP_CREATE_MODAL = "group-create-modal",
  GROUP_INVITE_MODAL = "group-invite-modal",
  GROUP_LEAVE_MODAL = "group-leave-modal",
  GROUP_KICK_MODAL = "group-kick-modal",
  SCHEDULE_ACCEPT_MODAL = "schedule-accept-modal",
  LESSON_DELETE_MODAL = "lesson-delete-modal",
}

export const modalComponents: Record<EModalVariables, JSX.Element> = {
  [EModalVariables.WELCOME_MODAL]: <WelcomeModal />,
  [EModalVariables.UNIVERSITY_MODAL]: <UniversityModal />,
  [EModalVariables.GROUP_CREATE_MODAL]: <GroupCreateModal />,
  [EModalVariables.GROUP_INVITE_MODAL]: <GroupInviteModal />,
  [EModalVariables.GROUP_LEAVE_MODAL]: <GroupLeaveModal />,
  [EModalVariables.SCHEDULE_ACCEPT_MODAL]: <ScheduleAcceptModal />,
  [EModalVariables.GROUP_KICK_MODAL]: <GroupKickModal />,
  [EModalVariables.LESSON_DELETE_MODAL]: <LessonDeleteModal />,
};

export const getModalComponent = (type: EModalVariables): React.ReactNode => {
  return modalComponents[type];
};
