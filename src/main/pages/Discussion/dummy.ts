import { Discussion, DiscussionAction } from './types';

export const dummyDiscussion: Discussion[] = [
  {
    id: 0,
    commentBy: 'Graham Miller',
    action: DiscussionAction.MENTION,
    post: {
      id: 0,
      name: 'Gusto Pay* Arrow',
    },
    time: 'Today at 6:00 AM',
    content: 'looping you in.',
  },
  {
    id: 1,
    commentBy: 'Dzuy Linh and Matt Lock',
    action: DiscussionAction.COMMENT,
    post: {
      id: 0,
      name: 'Google Analytics-Adservices',
    },
    time: 'Today at 2:00 PM',
    content: 'of course! We’ll ramp up for the Q4 push.',
  },
  {
    id: 2,
    commentBy: 'Alex Sivilay',
    action: DiscussionAction.MENTION,
    post: {
      id: '120',
      name: 'LA Brea Av3016865252',
    },
    time: 'Yesterday at 3:30 PM ',
    content: 'for visibility',
  },
  {
    id: 3,
    commentBy: 'Several people',
    action: DiscussionAction.COMMENT,
    post: {
      id: 'American21',
      name: 'American AIR0012185711384',
    },
    time: '2d ago',
    content: 'Yes the airfare is best for for 10/10 with American.',
  },
  {
    id: 4,
    commentBy: 'Matt Lock',
    action: DiscussionAction.MENTION,
    post: {
      id: 'Linh21',
      name: 'Linh & Sivilay PC-CPA',
    },
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
  {
    id: 5,
    commentBy: 'Matt Lock',
    action: DiscussionAction.MENTION,
    post: {
      id: 'Linh22',
      name: 'Linh & Sivilay PC-CPA',
    },
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
  {
    id: 6,
    commentBy: 'Matt Lock',
    action: DiscussionAction.MENTION,
    post: {
      id: 'Linh22',
      name: 'Linh & Sivilay PC-CPA',
    },
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
  {
    id: 7,
    commentBy: 'Matt Lock',
    action: DiscussionAction.MENTION,
    post: {
      id: 'Linh22',
      name: 'Linh & Sivilay PC-CPA',
    },
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
  {
    id: 8,
    commentBy: 'Matt Lock',
    action: DiscussionAction.MENTION,
    post: {
      id: 'Linh22',
      name: 'Linh & Sivilay PC-CPA',
    },
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
  {
    id: 9,
    commentBy: 'Matt Lock',
    action: DiscussionAction.MENTION,
    post: {
      id: 'Linh22',
      name: 'Linh & Sivilay PC-CPA',
    },
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
  {
    id: 10,
    commentBy: 'Matt Lock',
    action: DiscussionAction.MENTION,
    post: {
      id: 'Linh22',
      name: 'Linh & Sivilay PC-CPA',
    },
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
];
