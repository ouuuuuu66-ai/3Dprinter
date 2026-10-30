export type UserProfile = {
  id: string
  nickname: string
  avatarUrl: string | null
  avatarKey: string
  familyRole: 'super-admin'
}

export type FamilyState = {
  id: string
  name: string
  hasFamily: boolean
  boundDeviceCount: number
  memberCount: number
}

export type NotificationItem = {
  id: string
  title: string
  summary: string
  type: 'creation' | 'print' | 'points' | 'activity' | 'system'
  read: boolean
  createdAt: string
}

export type AppData = {
  user: UserProfile
  family: FamilyState
  points: number
  showPrintRecords: boolean
  printRecords: Array<{ id: string; name: string; emoji: string; printedAt: string }>
  showCreationRecords: boolean
  creationRecords: Array<{ id: string; name: string; emoji: string; createdAt: string; dimensions: string; printTime: string; material: string }>
  showSliceRecords: boolean
  sliceRecords: Array<{ id: string; name: string; emoji: string; dimensions: string; printTime: string; material: string }>
  showFavoriteRecords: boolean
  favoriteRecords: Array<{ id: string; name: string; emoji: string; author: string; authorEmoji: string; downloads: string; likes: string }>
  videoRecords: Array<{ id: string; name: string; emoji: string; duration: string; createdAt: string }>
  notifications: NotificationItem[]
  settings: {
    language: string
    notificationsEnabled: boolean
    autoUpdateEnabled: boolean
  }
}
