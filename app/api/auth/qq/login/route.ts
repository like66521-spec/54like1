import { NextResponse } from "next/server"

export async function POST() {
  try {
    // QQ OAuth配置
    const appId = process.env.QQ_APP_ID
    const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/qq/callback`)
    const state = Math.random().toString(36).substring(7)

    // 构建QQ授权URL
    const authUrl = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${appId}&redirect_uri=${redirectUri}&state=${state}&scope=get_user_info`

    return NextResponse.json({ authUrl })
  } catch (error) {
    console.error("QQ登录错误:", error)
    return NextResponse.json({ error: "登录失败" }, { status: 500 })
  }
}
