import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { demoData } from './demoData'
import type { AppData } from './types'

const STORAGE_KEY = 'ugee-maker-p1-demo-state-v5'

type AppStateContextValue = {
  data: AppData
  unreadCount: number
  updateNickname: (nickname: string) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  toggleNotifications: () => void
  toggleAutoUpdate: () => void
  setAvatar: (avatarKey: string) => void
  setLanguage: (language: string) => void
  togglePrintRecords: () => void
  deletePrintRecords: (ids: string[]) => void
  toggleCreationRecords: () => void
  deleteCreationRecords: (ids: string[]) => void
  toggleSliceRecords: () => void
  deleteSliceRecords: (ids: string[]) => void
  renameSliceRecord: (id: string, name: string) => void
  toggleFavoriteRecords: () => void
  cancelFavoriteRecords: (ids: string[]) => void
  deleteVideoRecords: (ids: string[]) => void
}

const AppStateContext = createContext<AppStateContextValue | null>(null)

function loadData(): AppData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...demoData, ...JSON.parse(saved) } : demoData
  } catch {
    return demoData
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(loadData)
  const update = (recipe: (current: AppData) => AppData) => {
    setData((current) => {
      const next = recipe(current)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }
  const value = useMemo<AppStateContextValue>(() => ({
    data,
    unreadCount: data.notifications.filter((item) => !item.read).length,
    updateNickname: (nickname) => update((current) => ({ ...current, user: { ...current.user, nickname } })),
    markNotificationRead: (id) => update((current) => ({ ...current, notifications: current.notifications.map((item) => item.id === id ? { ...item, read: true } : item) })),
    markAllNotificationsRead: () => update((current) => ({ ...current, notifications: current.notifications.map((item) => ({ ...item, read: true })) })),
    toggleNotifications: () => update((current) => ({ ...current, settings: { ...current.settings, notificationsEnabled: !current.settings.notificationsEnabled } })),
    toggleAutoUpdate: () => update((current) => ({ ...current, settings: { ...current.settings, autoUpdateEnabled: !current.settings.autoUpdateEnabled } })),
    setAvatar: (avatarKey) => update((current) => ({ ...current, user: { ...current.user, avatarKey, avatarUrl: null } })),
    setLanguage: (language) => update((current) => ({ ...current, settings: { ...current.settings, language } })),
    togglePrintRecords: () => update((current) => ({ ...current, showPrintRecords: !current.showPrintRecords })),
    deletePrintRecords: (ids) => update((current) => ({ ...current, printRecords: current.printRecords.filter((item) => !ids.includes(item.id)) })),
    toggleCreationRecords: () => update((current) => ({ ...current, showCreationRecords: !current.showCreationRecords })),
    deleteCreationRecords: (ids) => update((current) => ({ ...current, creationRecords: current.creationRecords.filter((item) => !ids.includes(item.id)) })),
    toggleSliceRecords: () => update((current) => ({ ...current, showSliceRecords: !current.showSliceRecords })),
    deleteSliceRecords: (ids) => update((current) => ({ ...current, sliceRecords: current.sliceRecords.filter((item) => !ids.includes(item.id)) })),
    renameSliceRecord: (id, name) => update((current) => ({ ...current, sliceRecords: current.sliceRecords.map((item) => item.id === id ? { ...item, name } : item) })),
    toggleFavoriteRecords: () => update((current) => ({ ...current, showFavoriteRecords: !current.showFavoriteRecords })),
    cancelFavoriteRecords: (ids) => update((current) => ({ ...current, favoriteRecords: current.favoriteRecords.filter((item) => !ids.includes(item.id)) })),
    deleteVideoRecords: (ids) => update((current) => ({ ...current, videoRecords: current.videoRecords.filter((item) => !ids.includes(item.id)) })),
  }), [data])
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (!context) throw new Error('useAppState must be used inside AppStateProvider')
  return context
}
