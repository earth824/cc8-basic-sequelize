const Sequelize = require('sequelize');
const { DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('sequel_begin', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

const Customer = sequelize.define(
  'Customer',
  {
    // uuid: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    //   unique: true
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: DataTypes.STRING,
    birthDate: {
      type: DataTypes.DATEONLY,
      field: 'birth_date'
    },
    gender: DataTypes.STRING
  },
  {
    tableName: 'customers',
    timestamps: false
  }
);

const createCustomer = async () => {
  const newCustomer = await Customer.create({ name: 'Jim', address: '111' });
  console.log(newCustomer.toJSON());
  console.log(JSON.parse(JSON.stringify(newCustomer)));
};

const updateCustomer = async () => {
  const update = await Customer.update(
    { address: '202' },
    { where: { id: 2 } }
  );
  console.log(update);
  console.log(JSON.parse(JSON.stringify(update)));
  // console.log(update.toJSON());
};

const createInstanceCustomer = async () => {
  // const customer = new Customer();
  const customer = Customer.build({ name: 'Michel', address: '16' });
  // customer.name = 'Anna';
  // customer.address = '100';
  await customer.save();
};

const deleteCustomer = async () => {
  const deleted = await Customer.destroy({ where: { id: 500 } });
  console.log(deleted);
  console.log(JSON.parse(JSON.stringify(deleted)));
};

const selectCustomers = async () => {
  // const customer = await Customer.findOne({
  //   where: { id: 400 }
  // });
  // const customer = await Customer.findByPk(30);
  // const customers = await Customer.findAll({
  //   where: { id: 400 }
  // });
  // const customers = await Customer.findAll({
  //   // where: { name: 'Michel' },
  //   attributes: ['name', [sequelize.fn('COUNT', sequelize.col('id')), 'total']],
  //   group: ['name'],
  //   order: [['name', 'DESC']]
  // });
  // const customers = await Customer.findAll({
  //   where: {
  //     [Op.or]: [{ name: 'Michel' }, { address: '100' }, { id: 1 }]
  //   }
  // });
  // const customers = await Customer.findAll({
  //   // where: {
  //   //   name: { [Op.in]: ['John', 'Anna'] }
  //   // }
  //   where: {
  //     name: ['John', 'Anna']
  //   }
  // }); // SELECT * FROM customers WHERE name IN ('John', 'Anna')
  // const customers = await Customer.findAll({
  //   // where: {
  //   //   name: {
  //   //     [Op.like]: 'J%'
  //   //   }
  //   // }
  //   where: {
  //     name: {
  //       [Op.startsWith]: 'J'
  //     }
  //   }
  // });
  // const customers = await Customer.findAll({
  //   where: {
  //     [Op.or]: [
  //       {
  //         id: {
  //           [Op.lte]: 3
  //         }
  //       },
  //       {
  //         name: {
  //           [Op.like]: 'A%'
  //         }
  //       }
  //     ]
  //   }
  // });
  // const customers = await Customer.findAll({
  //   limit: 2,
  //   offset: 2,
  //   order: [['name', 'DESC']]
  // });
  // console.log(JSON.parse(JSON.stringify(customers)));
};

// createCustomer();
// updateCustomer();
// createInstanceCustomer();
// deleteCustomer();
// selectCustomers();

// sequelize.sync({ force: true }).then(() => console.log('DB sync'));

// const auth = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('DB connected');
//   } catch (err) {
//     console.log(err);
//   }
// };
// auth();

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('DB connected');
//   } catch (err) {
//     console.log(err);
//   }
// })();

// sequelize
//   .authenticate()
//   .then(() => console.log('DB connected'))
//   .catch(err => console.log(err));
