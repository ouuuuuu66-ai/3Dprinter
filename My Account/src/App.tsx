import { Navigate, Route, Routes } from 'react-router-dom'
import { AppPreview } from './components/layout/AppPreview'
import { AccountPage } from './pages/AccountPage'
import { AssociationCodePage } from './pages/AssociationCodePage'
import { HomePlaceholderPage } from './pages/HomePlaceholderPage'
import { MinePage } from './pages/MinePage'
import { ModuleBoundaryPage } from './pages/ModuleBoundaryPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { SettingsPage } from './pages/SettingsPage'
import { PrintListPage, PrinterConnectPage, PrintingPage } from './pages/prints/PrintPages'
import { VideoListPage, VideoPlayerPage } from './pages/videos/VideoPages'
import { AboutPage, AgreementPage, FeedbackPage, LanguagePage, StoragePage } from './pages/settings/SettingsDetailPages'
import { GalleryPage, LoginPage, SystemAvatarPage, UsernamePage } from './pages/account/AccountFlowPages'
import { CreationListPage, CreationPreviewPage } from './pages/creations/CreationPages'
import { SliceListPage, SlicePreviewPage } from './pages/slices/SlicePages'
import { FavoriteListPage } from './pages/favorites/FavoritePages'

export function App() {
  return (
    <AppPreview>
      <Routes>
        <Route path="/" element={<Navigate to="/mine" replace />} />
        <Route path="/mine" element={<MinePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/association-code" element={<AssociationCodePage />} />
        <Route path="/points" element={<ModuleBoundaryPage title="积分充值" description="充值接口尚未接入，本阶段仅保留模块入口与积分状态。" />} />
        <Route path="/family/*" element={<ModuleBoundaryPage title="家庭管理" description="复杂业务模块已建立路由边界，待后续设计图后逐页实现。" />} />
        <Route path="/models/prints" element={<PrintListPage />} />
        <Route path="/models/creations" element={<CreationListPage />} />
        <Route path="/models/creations/:creationId" element={<CreationPreviewPage />} />
        <Route path="/models/slices" element={<SliceListPage />} />
        <Route path="/models/slices/:sliceId" element={<SlicePreviewPage />} />
        <Route path="/models/favorites" element={<FavoriteListPage />} />
        <Route path="/models/prints/connect/:printId" element={<PrinterConnectPage />} />
        <Route path="/workbench/printing/:printId" element={<PrintingPage />} />
        <Route path="/models/videos" element={<VideoListPage />} />
        <Route path="/models/videos/:videoId" element={<VideoPlayerPage />} />
        <Route path="/models/:category" element={<ModuleBoundaryPage title="模型分类" description="该分类尚未提供完整设计图，保留模块边界。" />} />
        <Route path="/settings/language" element={<LanguagePage />} />
        <Route path="/settings/storage" element={<StoragePage />} />
        <Route path="/settings/feedback" element={<FeedbackPage />} />
        <Route path="/settings/about" element={<AboutPage />} />
        <Route path="/settings/agreement" element={<AgreementPage />} />
        <Route path="/settings/privacy" element={<AgreementPage privacy />} />
        <Route path="/account/avatar/system" element={<SystemAvatarPage />} />
        <Route path="/account/avatar/gallery" element={<GalleryPage />} />
        <Route path="/account/username" element={<UsernamePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tab/:tab" element={<HomePlaceholderPage />} />
        <Route path="*" element={<Navigate to="/mine" replace />} />
      </Routes>
    </AppPreview>
  )
}
