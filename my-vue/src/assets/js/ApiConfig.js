const Ip = 'http://10.10.10.102/service';//Ip地址
// const Ip = 'http://192.168.0.190:8405';//Ip地址
// const Ip = '/service';//Ip地址

const ApiConfig = {
  Token:{
    SetToken:`${Ip}/api/Token/SetToken?token={token}`,// GET 设置会话Token
  },
  Search:{
    GetSearchInfo_Drug:`${Ip}/api/Search/GetSearchInfo_Drug`,
    GetSearchInfo_Company:`${Ip}/api/Search/GetSearchInfo_Company`,
    GetSearchInfo_ATC:`${Ip}/api/Search/GetSearchInfo_ATC`,
    GetSearchInfo_CPHIIC:`${Ip}/api/Search/GetSearchInfo_CPHIIC`,
  },
  Sales:{
    GetRank:`${Ip}/api/Sales/GetRank`,//GET 中国销售排名前50
    GetKeywords:`${Ip}/api/Sales/GetKeywords`,//GET 热门搜索词
    GetTotalInfo:`${Ip}/api/Sales/GetTotalInfo`,//POST 统计页-关键字查询字典信息
    GetChart1_Drug:`${Ip}/api/Sales/GetChart1_Drug`,//POST 一级图表—药品
    GetChart1_Company:`${Ip}/api/Sales/GetChart1_Company`,//POST 一级图表—企业
    GetChart1_ATC:`${Ip}/api/Sales/GetChart1_ATC`,//POST 一级图表—ATC领域
    GetChart1_CPHIIC:`${Ip}/api/Sales/GetChart1_CPHIIC`,//POST 一级图表—CPHIIC领域
    GetChart2_Drug:`${Ip}/api/Sales/GetChart2_Drug`,//POST 二级图表—药品
    GetChart2_Company:`${Ip}/api/Sales/GetChart2_Company`,//POST 二级图表—企业
    GetChart2_ATC:`${Ip}/api/Sales/GetChart2_ATC`,//POST 二级图表—ATC领域
    GetChart2_CPHIIC:`${Ip}/api/Sales/GetChart2_CPHIIC`,//POST 二级图表—CPHIIC领域
    GetATCInfo:`${Ip}/api/Sales/GetATCInfo`,
    GetCPHIICInfo:`${Ip}/api/Sales/GetCPHIICInfo`,
  },
  Subscription:{
    GetPushList_Zgsb:`${Ip}/api/Subscription/GetPushList_Zgsb`,
  },
  Yzxpj:{
    GetList:`${Ip}/api/Yzxpj/GetList`,//POST 一致性评价列表
    GetInfo:`${Ip}/api/Yzxpj/GetInfo`,//POST 一致性评价 - 药品信息
  },
  Zgsb:{
    GetList:`${Ip}/api/DrugApproval/GetList`,//POST 中国申报列表
    GetInfo:`${Ip}/api/DrugApproval/GetInfo`,//POST 一致性评价 - 药品信息
    GetRank:`${Ip}/api/DrugApproval/GetRank`,//GET CFDA最新批文
  },
  Index:{
    GetSalesRank:`${Ip}/api/Index/GetSalesRank`,//GET 中国销售排名前20
    GetDataCount:`${Ip}/api/Index/GetDataCount`,//POST 数据库数据量
    GetKeywords_Drug:`${Ip}/api/Index/GetKeywords_Drug`,//热门搜索词-药品
    GetKeywords_Company:`${Ip}/api/Index/GetKeywords_Company`,//热门搜索词-药品
    GetATCInfo:`${Ip}/api/Index/GetATCInfo`,//GET ATC分类取得
    GetCPHIICInfo:`${Ip}/api/Index/GetCPHIICInfo`,//GET ATC分类取得
    getWechatJsInfo:`${Ip}/api/Index/getWechatJsInfo`,//GET ATC分类取得
  },
  Member:{
    GetInfo:`${Ip}/api/Member/GetInfo`,//取得用户信息
    GetSubscriptionInfo:`${Ip}/api/Member/GetSubscriptionInfo`,//取得用户订阅信息
    OpenSubscription:`${Ip}/api/Member/OpenSubscription`,//用户订阅
    CloseSubscription:`${Ip}/api/Member/CloseSubscription`,//用户取消订阅
    GetSubscriptionHistory:`${Ip}/api/Member/GetSubscriptionHistory`,//用户历史订阅信息
    CheckWechatAuth:`${Ip}/api/Member/CheckWechatAuth`,
    doWechatAuth:`${Ip}/api/Member/doWechatAuth`,
  },
  Zgss:{
    GetList:`${Ip}/api/Zgss/GetList`,//POST 中国上市列表-国产+进口
    GetGcypInfo:`${Ip}/api/Zgss/GetGcypInfo`,//POST 中国上市-国产药品信息
    GetJkypInfo:`${Ip}/api/Zgss/GetJkypInfo`,//POST 中国上市-进口药品信息
    GetRank:`${Ip}/api/Zgss/GetRank`,//GET CDE最新受理
  },
  Cron:{
    doCronGcyp:`${Ip}/api/Cron/doCronGcyp`,//GET 中国上市-国产药品数据同步
    doCronJkyp:`${Ip}/api/Cron/doCronJkyp`,//GET 中国上市-进口药品数据同步
    doCronZgsb:`${Ip}/api/Cron/doCronZgsb`,//GET 中国申报数据同步
    doCronYzxpj:`${Ip}:/api/Cron/doCronYzxpj`,//GET 一致性评价数据同步
    doCronSaleChina:`${Ip}/api/Cron/doCronSaleChina`,//GET 中国销售数据同步
    GetList:`${Ip}/api/Cron/GetList?iDisplayStart={iDisplayStart}&iDisplayLength={iDisplayLength}`,//GET 同步数据列表显示
  }
}
export {
	ApiConfig
}
