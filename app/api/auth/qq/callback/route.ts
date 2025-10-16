import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code) {
      return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
    }

    // 使用code换取access_token
    const tokenResponse = await fetch(
      `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.QQ_APP_ID}&client_secret=${process.env.QQ_APP_SECRET}&code=${code}&redirect_uri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/qq/callback`)}`,
    )
    const tokenText = await tokenResponse.text()
    const tokenParams = new URLSearchParams(tokenText)
    const accessToken = tokenParams.get("access_token")

    if (!accessToken) {
      return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
    }

    // 获取OpenID
    const openIdResponse = await fetch(`https://graph.qq.com/oauth2.0/me?access_token=${accessToken}`)
    const openIdText = await openIdResponse.text()
    const openIdMatch = openIdText.match(/"openid":"(\w+)"/)
    const openId = openIdMatch ? openIdMatch[1] : null

    if (!openId) {
      return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
    }

    // 获取用户信息
    const userResponse = await fetch(
      `https://graph.qq.com/user/get_user_info?access_token=${accessToken}&oauth_consumer_key=${process.env.QQ_APP_ID}&openid=${openId}`,
    )
    const userData = await userResponse.json()

    // 这里应该将用户信息保存到数据库，并创建session
    // 示例：await createUserSession({ openId, ...userData })

    // 重定向回首页
    return NextResponse.redirect(new URL("/?login=success", request.url))
  } catch (error) {
    console.error("QQ回调错误:", error)
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
  }
}
