/**
 * Created by smallwolf on 2017/8/4.
 */

module.exports = {
  ERROR_INTERNAL: [10000, '服务器内部错误'],
  ERROR_REQUEST: [1000, '请求出错'],
  ERROR_SIGN_CHECK: [1001, 'sign校验失败'],
  ERROR_PARAM_CHECK: [1002, '参数不正确'],
  ERROR_NOT_PAGE: [1003, '页面不存在'],
  ERROR_NO_LOGIN: [1004, '用户未登录'],
  ERROR_NO_ROOM_OWNER: [1006, '不是房主无法解散'],
  ERROR_DISSOLVE_ROOM_FAIL: [1007, '解散房间失败'],
  ERROR_REQUEST_TIMEOUT: [1008, '请求超时'],
  ERROR_INVITED: [1009, '已经绑定代理'],
  ERROR_TOKEN_CHECK: [1010, '无权限操作'],
  ERROR_USER_EXIST: [1011, '用户已存在'],
  ERROR_GEM_NOT_ENUGHT: [1012, '房卡数量不足'],
  ERROR_USER_IN_ROOM: [1013, '玩家已经在房间中'],
  ERROR_USER_CREATE_ROOM: [1014, '创建房间失败'],
  ERROR_USER_ENTER_ROOM: [1015, '进入房间失败'],
  ERROR_NOT_FOUND_GAME_SERVER: [1016, '服务器已满'],
  ERROR_USED_ORDER: [1017, '该订单已经充值过了'],
  ERROR_USED_ACTIVITY_CHANCE: [1018, '已经分享过了'],
  ERROR_EXISTED_IN_ROOM: [1019, '你已经在房间中'],
  ERROR_ALREADY_GOT: [1020, '你已经领取过了'],
  ERROR_NOT_ABILITY: [1021, '你还有达到领取资格'],
  ERROR_DEALING_DISSOLVE:[1022, '系统已经正在进行结算了'],
  ERROR_ORDER_USER:[1023, '订单信息不存在'],
  ERROR_WECHAT_LOGIN:[1024, '微信登陆失败'],
  ERROR_NOT_PROXY:[1025, '该用户不是代理'],
  ERROR_NOT_USER:[1026, '该用户不存在'],
  ERROR_REGEISTER_USER:[1027, '注册失败'],
  ERROR_EXIST_USER:[1028, '用户已存在'],

  ERROR_DATA_NOEXISTED: [2000, '数据不存在'],
  ERROR_DATA_UPDATE_FAILED: [2001, '数据修改失败'],
  ERROR_DATA_CREATE_FAILED: [2002, '创建失败'],
  ERROR_GEN_TICKET_ERROR: [2003, '生成微信JS TICKET失败'],
  
  ERROR_REQ_THIRD_PARAMS: [3000, '参数错误'],
  ERROR_REQ_KEY: [3001, '未找到对应的配置信息'],
  ERROR_RECEIPT_NULL: [3002, '未找到票据信息'],
  ERROR_RECEIPT_PRODUCT_ID: [3003, '购买的商品不存在']
};