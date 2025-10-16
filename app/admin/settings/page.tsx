"use client"

import { useState } from "react"
import { Save, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function SettingsPage() {
  const [showApiKeys, setShowApiKeys] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // 网站基础设置
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "54LIKE",
    siteDescription: "发现优质内容，分享知识与见解",
    siteKeywords: "内容分享,知识付费,跨境电商,数字营销",
    siteUrl: "https://54like.com",
    contactEmail: "contact@54like.com",
    icp: "",
  })

  // SEO设置
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "54LIKE - 优质内容分享平台",
    metaDescription: "发现优质内容，分享知识与见解",
    ogImage: "/og-image.png",
    enableSitemap: true,
    enableRobots: true,
  })

  // 支付设置
  const [paymentSettings, setPaymentSettings] = useState({
    wechatAppId: "",
    wechatAppSecret: "",
    wechatMerchantId: "",
    wechatApiKey: "",
    alipayAppId: "",
    alipayPrivateKey: "",
    alipayPublicKey: "",
  })

  // 邮件设置
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
    fromEmail: "noreply@54like.com",
    fromName: "54LIKE",
  })

  // 系统设置
  const [systemSettings, setSystemSettings] = useState({
    enableRegistration: true,
    enableComments: true,
    requireEmailVerification: false,
    maintenanceMode: false,
    maxUploadSize: "10",
    defaultUserCoins: "100",
    defaultUserLevel: "1",
  })

  const handleSave = async (section: string) => {
    setIsSaving(true)
    // 实际应该调用API保存设置
    setTimeout(() => {
      setIsSaving(false)
      toast.success("设置已保存")
    }, 1000)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">系统设置</h1>
        <p className="text-muted-foreground">配置网站的各项参数和功能</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">基础设置</TabsTrigger>
          <TabsTrigger value="seo">SEO设置</TabsTrigger>
          <TabsTrigger value="payment">支付配置</TabsTrigger>
          <TabsTrigger value="email">邮件配置</TabsTrigger>
          <TabsTrigger value="system">系统配置</TabsTrigger>
        </TabsList>

        {/* 基础设置 */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>网站基础信息</CardTitle>
              <CardDescription>配置网站的基本信息和联系方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">网站名称</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">网站描述</Label>
                  <Textarea
                    id="siteDescription"
                    rows={3}
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteKeywords">网站关键词</Label>
                  <Input
                    id="siteKeywords"
                    placeholder="用逗号分隔"
                    value={generalSettings.siteKeywords}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteKeywords: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteUrl">网站URL</Label>
                  <Input
                    id="siteUrl"
                    type="url"
                    value={generalSettings.siteUrl}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteUrl: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">联系邮箱</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icp">ICP备案号</Label>
                  <Input
                    id="icp"
                    placeholder="粤ICP备xxxxxxxx号"
                    value={generalSettings.icp}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, icp: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("general")} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "保存中..." : "保存设置"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO设置 */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>搜索引擎优化</CardTitle>
              <CardDescription>配置网站的SEO相关设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta标题</Label>
                  <Input
                    id="metaTitle"
                    value={seoSettings.metaTitle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta描述</Label>
                  <Textarea
                    id="metaDescription"
                    rows={3}
                    value={seoSettings.metaDescription}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogImage">OG图片URL</Label>
                  <Input
                    id="ogImage"
                    placeholder="/og-image.png"
                    value={seoSettings.ogImage}
                    onChange={(e) => setSeoSettings({ ...seoSettings, ogImage: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">推荐尺寸：1200x630px</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>启用网站地图</Label>
                    <p className="text-sm text-muted-foreground">自动生成 sitemap.xml</p>
                  </div>
                  <Switch
                    checked={seoSettings.enableSitemap}
                    onCheckedChange={(checked) => setSeoSettings({ ...seoSettings, enableSitemap: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>启用 robots.txt</Label>
                    <p className="text-sm text-muted-foreground">控制搜索引擎爬虫</p>
                  </div>
                  <Switch
                    checked={seoSettings.enableRobots}
                    onCheckedChange={(checked) => setSeoSettings({ ...seoSettings, enableRobots: checked })}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("seo")} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "保存中..." : "保存设置"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 支付配置 */}
        <TabsContent value="payment">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>微信支付配置</CardTitle>
                <CardDescription>配置微信支付相关参数</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wechatAppId">App ID</Label>
                  <Input
                    id="wechatAppId"
                    type={showApiKeys ? "text" : "password"}
                    value={paymentSettings.wechatAppId}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, wechatAppId: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wechatAppSecret">App Secret</Label>
                  <Input
                    id="wechatAppSecret"
                    type={showApiKeys ? "text" : "password"}
                    value={paymentSettings.wechatAppSecret}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, wechatAppSecret: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wechatMerchantId">商户号</Label>
                  <Input
                    id="wechatMerchantId"
                    type={showApiKeys ? "text" : "password"}
                    value={paymentSettings.wechatMerchantId}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, wechatMerchantId: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wechatApiKey">API密钥</Label>
                  <Input
                    id="wechatApiKey"
                    type={showApiKeys ? "text" : "password"}
                    value={paymentSettings.wechatApiKey}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, wechatApiKey: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>支付宝配置</CardTitle>
                <CardDescription>配置支付宝支付相关参数</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="alipayAppId">App ID</Label>
                  <Input
                    id="alipayAppId"
                    type={showApiKeys ? "text" : "password"}
                    value={paymentSettings.alipayAppId}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, alipayAppId: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alipayPrivateKey">应用私钥</Label>
                  <Textarea
                    id="alipayPrivateKey"
                    rows={4}
                    value={paymentSettings.alipayPrivateKey}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, alipayPrivateKey: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alipayPublicKey">支付宝公钥</Label>
                  <Textarea
                    id="alipayPublicKey"
                    rows={4}
                    value={paymentSettings.alipayPublicKey}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, alipayPublicKey: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-4">
              <Button onClick={() => handleSave("payment")} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "保存中..." : "保存设置"}
              </Button>
              <Button variant="outline" onClick={() => setShowApiKeys(!showApiKeys)}>
                {showApiKeys ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                {showApiKeys ? "隐藏" : "显示"}密钥
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* 邮件配置 */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>SMTP邮件配置</CardTitle>
              <CardDescription>配置系统邮件发送功能</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP主机</Label>
                    <Input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP端口</Label>
                    <Input
                      id="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP用户名</Label>
                  <Input
                    id="smtpUser"
                    value={emailSettings.smtpUser}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP密码</Label>
                  <Input
                    id="smtpPassword"
                    type={showApiKeys ? "text" : "password"}
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="fromEmail">发件人邮箱</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromName">发件人名称</Label>
                  <Input
                    id="fromName"
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("email")} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "保存中..." : "保存设置"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 系统配置 */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>系统功能配置</CardTitle>
              <CardDescription>配置系统的各项功能开关和参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>开放用户注册</Label>
                    <p className="text-sm text-muted-foreground">允许新用户注册账号</p>
                  </div>
                  <Switch
                    checked={systemSettings.enableRegistration}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, enableRegistration: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>启用评论功能</Label>
                    <p className="text-sm text-muted-foreground">用户可以对文章发表评论</p>
                  </div>
                  <Switch
                    checked={systemSettings.enableComments}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, enableComments: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>需要邮箱验证</Label>
                    <p className="text-sm text-muted-foreground">注册后需验证邮箱才能使用</p>
                  </div>
                  <Switch
                    checked={systemSettings.requireEmailVerification}
                    onCheckedChange={(checked) =>
                      setSystemSettings({ ...systemSettings, requireEmailVerification: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-red-500">维护模式</Label>
                    <p className="text-sm text-muted-foreground">启用后前台将显示维护页面</p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, maintenanceMode: checked })}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="maxUploadSize">最大上传文件大小（MB）</Label>
                  <Input
                    id="maxUploadSize"
                    type="number"
                    value={systemSettings.maxUploadSize}
                    onChange={(e) => setSystemSettings({ ...systemSettings, maxUploadSize: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultUserCoins">新用户初始硬币</Label>
                  <Input
                    id="defaultUserCoins"
                    type="number"
                    value={systemSettings.defaultUserCoins}
                    onChange={(e) => setSystemSettings({ ...systemSettings, defaultUserCoins: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultUserLevel">新用户初始等级</Label>
                  <Input
                    id="defaultUserLevel"
                    type="number"
                    value={systemSettings.defaultUserLevel}
                    onChange={(e) => setSystemSettings({ ...systemSettings, defaultUserLevel: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("system")} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "保存中..." : "保存设置"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


