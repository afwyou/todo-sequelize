'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false,//這是必填欄位,確保你不會新增一個「不知道屬於誰」的 todo 到資料庫裡。

      //外鍵設定,設定這欄位是跟 Users 資料表裡的 id 欄位的關聯。
      reference: {
        model: 'Users',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'UserId')
  }
};
