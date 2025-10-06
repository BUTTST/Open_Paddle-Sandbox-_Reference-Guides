import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'No body' }, { status: 401 });
    }

    // ⚠️ 重要：這是 Demo 範例，僅適用於 Sandbox 測試環境
    // 生產環境下必須驗證 Webhook 簽章（p_signature）
    // 詳見文檔：docs/05-Webhook事件處理指南.md
    
    console.log('Webhook received:', body);
    
    // 處理不同的事件類型
    const eventType = body.alert_name || body.event_type;
    
    switch(eventType) {
      case 'subscription_created':
        console.log('✅ 訂閱建立事件');
        // TODO: 開通用戶權限
        break;
      case 'subscription_cancelled':
        console.log('❌ 訂閱取消事件');
        // TODO: 移除用戶權限
        break;
      case 'subscription_payment_succeeded':
        console.log('💰 訂閱續費成功');
        // TODO: 延長權限期限
        break;
      case 'payment_succeeded':
        console.log('💰 付款成功');
        // TODO: 處理一次性付款
        break;
      default:
        console.log(`📬 收到事件: ${eventType}`);
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

