const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize('sequel_associate', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

const Customer = sequelize.define(
  'Customer',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'customers',
    timestamps: false
  }
);

const Mobile = sequelize.define(
  'Mobile',
  {
    phoneNumber: {
      type: DataTypes.STRING,
      field: 'phone_number'
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

Customer.hasMany(Mobile, {
  foreignKey: {
    name: 'customerId',
    allowNull: false,
    field: 'customer_id'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
});

Mobile.belongsTo(Customer, {
  foreignKey: {
    name: 'customerId',
    allowNull: false,
    field: 'customer_id'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
});

const bulkCreateCustomer = async () => {
  const customers = await Customer.bulkCreate([
    { name: 'John' },
    { name: 'Jim' },
    { name: 'Rob' },
    { name: 'Pete' },
    { name: 'Mike' },
    { name: 'Bob' }
  ]);
  console.log(customers);
};

const bulkCreateMobile = async () => {
  const mobiles = await Mobile.bulkCreate([
    {
      phoneNumber: '0814356892',
      brand: 'Apple',
      model: 'iPhone 12',
      customerId: 1
    },
    {
      phoneNumber: null,
      brand: 'Apple',
      model: 'iPhone 8',
      customerId: 1
    },
    {
      phoneNumber: '0906210983',
      brand: 'Samsung',
      model: 'S2',
      customerId: 2
    },
    {
      phoneNumber: '0844389587',
      brand: 'Nokia',
      model: '3310',
      customerId: 3
    },
    {
      phoneNumber: '0867771222',
      brand: 'Huawei',
      model: 'GR5',
      customerId: 3
    },
    {
      phoneNumber: '0810901983',
      brand: 'Oppo',
      model: 'A5',
      customerId: 3
    },
    {
      phoneNumber: '0905136969',
      brand: 'Apple',
      model: 'iPhone Xs',
      customerId: 5
    }
  ]);
};

// bulkCreateCustomer();
// bulkCreateMobile();

const getMobile = async id => {
  // const mobile = await Mobile.findOne({
  //   where: { id },
  //   include: {
  //     model: Customer,
  //     attributes: ['name']
  //   }
  // });
  const mobile = await Mobile.findAll({
    include: {
      model: Customer,
      attributes: ['name']
    }
  });

  console.log(JSON.parse(JSON.stringify(mobile)));
};

const getCustomers = async () => {
  const customers = await Customer.findAll({
    include: {
      model: Mobile,
      attributes: ['phoneNumber', 'brand', 'model'],
      required: true
    }
  });
  // console.log(customers);
  for (let customer of customers) {
    console.log(JSON.parse(JSON.stringify(customer)));
  }
};

// getMobile(1);
getCustomers();

// sequelize.sync({ force: true });
