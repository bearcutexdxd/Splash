module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Skins', [{
      name: 'Mila',
      img: 'pipo-nekonin001.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Garfield',
      img: 'pipo-nekonin002.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Demon',
      img: 'pipo-nekonin003.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Julia',
      img: 'pipo-nekonin004.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Hatiko',
      img: 'pipo-nekonin005.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Colorbe',
      img: 'pipo-nekonin006.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Rogue',
      img: 'pipo-nekonin007.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Yaroslav',
      img: 'pipo-nekonin008.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Tailwind',
      img: 'pipo-nekonin009.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Midjourney',
      img: 'pipo-nekonin010.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Pinky',
      img: 'pipo-nekonin011.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'AquaCat',
      img: 'pipo-nekonin012.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Artem',
      img: 'pipo-nekonin013.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Padishah',
      img: 'pipo-nekonin014.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Misha',
      img: 'pipo-nekonin015.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'DarkMisha',
      img: 'pipo-nekonin016.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Kung-Foo',
      img: 'pipo-nekonin017.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Angel',
      img: 'pipo-nekonin018.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Luciefer',
      img: 'pipo-nekonin019.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Helloween',
      img: 'pipo-nekonin020.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Busya',
      img: 'pipo-nekonin021.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'FullBusya',
      img: 'pipo-nekonin022.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '80-e',
      img: 'pipo-nekonin023.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Rose',
      img: 'pipo-nekonin024.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Anastacia',
      img: 'pipo-nekonin025.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Skverna',
      img: 'pipo-nekonin026.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sima',
      img: 'pipo-nekonin027.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Bayar',
      img: 'pipo-nekonin028.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '70-e',
      img: 'pipo-nekonin029.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sheep',
      img: 'pipo-nekonin030.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Kirill',
      img: 'pipo-nekonin031.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     */
    await queryInterface.bulkDelete('Skins', null, {});
  },
};
