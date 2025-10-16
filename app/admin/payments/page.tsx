import { CheckCircle, Clock, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminPaymentsPage() {
  // Mock payment data
  const payments = [
    {
      id: "1",
      articleTitle: "2024年人工智能发展趋势",
      userName: "用户123",
      amount: 9.9,
      method: "wechat",
      status: "completed",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      articleTitle: "创业公司如何在竞争激烈的市场中脱颖而出",
      userName: "用户456",
      amount: 19.9,
      method: "alipay",
      status: "completed",
      createdAt: new Date("2024-01-14"),
    },
    {
      id: "3",
      articleTitle: "2024年人工智能发展趋势",
      userName: "用户789",
      amount: 9.9,
      method: "wechat",
      status: "pending",
      createdAt: new Date("2024-01-14"),
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="h-3 w-3" />
            已完成
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="gap-1 text-amber-600 border-amber-600">
            <Clock className="h-3 w-3" />
            待支付
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="gap-1 text-red-600 border-red-600">
            <XCircle className="h-3 w-3" />
            失败
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">支付记录</h1>
        <p className="text-muted-foreground">查看所有支付交易记录</p>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单号</TableHead>
              <TableHead>文章标题</TableHead>
              <TableHead>用户</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>支付方式</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                <TableCell className="max-w-md">
                  <div className="line-clamp-2">{payment.articleTitle}</div>
                </TableCell>
                <TableCell>{payment.userName}</TableCell>
                <TableCell className="font-medium">¥{payment.amount}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{payment.method === "wechat" ? "微信支付" : "支付宝"}</Badge>
                </TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                <TableCell>{payment.createdAt.toLocaleDateString("zh-CN")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
