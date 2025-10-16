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
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.WECHAT_APP_ID}&secret=${process.env.WECHAT_APP_SECRET}&code=${code}&grant_type=authorization_code`,
    )
    const tokenData = await tokenResponse.json()

    if (tokenData.errcode) {
      return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
    }

    // 获取用户信息
    const userResponse = await fetch(
      `https://api.weixin.qq.com/sns/userinfo?access_token=${tokenData.access_token}&openid=${tokenData.openid}`,
    )
    const userData = await userResponse.json()

    // 这里应该将用户信息保存到数据库，并创建session
    // 示例：await createUserSession(userData)

    // 重定向回首页
    return NextResponse.redirect(new URL("/?login=success", request.url))
  } catch (error) {
    console.error("微信回调错误:", error)
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
  }
}
