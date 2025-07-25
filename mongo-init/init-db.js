// MongoDB initialization script for YubYuYi database
print('Starting YubYuYi database initialization...');

// Switch to the yubyuyi database
db = db.getSiblingDB('yubyuyi');

// Create collections if they don't exist
db.createCollection('users');
db.createCollection('durians');
db.createCollection('farms');
db.createCollection('houses');
db.createCollection('lots');
db.createCollection('shipments');

print('Collections created successfully!');

// Insert initial farms data
print('Inserting initial farms data...');
db.farms.insertMany([
  {
    "_id": ObjectId("6849334355e150f9edf84ae9"),
    "name": {
      "th": "สวนทุเรียนตำนาน",
      "en": "Legendary Garden"
    },
    "GAP": "กษ 03-9001-22-333-444444",
    "createdAt": new Date("2025-06-11T07:41:55.910Z"),
    "updatedAt": new Date("2025-06-11T07:41:55.910Z"),
    "__v": 0
  },
  {
    "_id": ObjectId("684933886628fbace6ad7d3d"),
    "name": {
      "th": "สวนทุเรียนยั่งยืน",
      "en": "Sustain Garden"
    },
    "GAP": "กษ 03-9001-77-888-999999",
    "createdAt": new Date("2025-06-11T07:43:04.742Z"),
    "updatedAt": new Date("2025-06-11T07:43:04.742Z"),
    "__v": 0
  }
]);
print('Farms data inserted successfully!');

// Insert initial houses data
print('Inserting initial houses data...');
db.houses.insertMany([
  {
    "_id": ObjectId("684a84fd0647c42c1be9602d"),
    "name": {
      "th": "ล้งเจริญการค้าทุเรียน",
      "en": "Charoen Trading"
    },
    "createdAt": new Date("2025-06-12T07:42:53.349Z"),
    "updatedAt": new Date("2025-06-12T07:42:53.349Z"),
    "__v": 0
  }
]);
print('Houses data inserted successfully!');

// Insert initial users data
print('Inserting initial users data...');
db.users.insertMany([
  {
    "_id": ObjectId("684a74e7b6a725a81f228fba"),
    "username": "durian",
    "firstName": "Tanya",
    "lastName": "Choo",
    "role": "farmer",
    "farmId": ObjectId("6849334355e150f9edf84ae9"),
    "password": "$2b$10$vmz6Sax6p.MJ/dI5Eget9uimLmNYMEWs4d3gBtEjKkVCwHSYS9Mri",
    "createdAt": new Date("2025-06-12T06:34:15.030Z"),
    "updatedAt": new Date("2025-06-12T06:34:15.030Z"),
    "__v": 0,
    "houseId": null
  },
  {
    "_id": ObjectId("684a753ab6a725a81f228fbe"),
    "username": "durianhouse",
    "firstName": "Nuttapon",
    "lastName": "Lert",
    "role": "house",
    "farmId": null,
    "password": "$2b$10$L01AZ2gZQopY.jGYfRPt4O5P4uYoJFUEVGncbso1M8yOg7ne8pWre",
    "createdAt": new Date("2025-06-12T06:35:38.671Z"),
    "updatedAt": new Date("2025-06-12T06:35:38.671Z"),
    "__v": 0,
    "houseId": ObjectId("684a84fd0647c42c1be9602d")
  },
  {
    "_id": ObjectId("684a75b0b6a725a81f228fc1"),
    "username": "duriantransport",
    "firstName": "Tanakrit",
    "lastName": "Saeng",
    "role": "transport",
    "farmId": null,
    "password": "$2b$10$iYxdIcKAQmmuUrPGyAZd4.teJAgKg9v4AA0kYQJERpkuLH5y32zMm",
    "createdAt": new Date("2025-06-12T06:37:36.767Z"),
    "updatedAt": new Date("2025-06-12T06:37:36.767Z"),
    "__v": 0,
    "houseId": null
  },
  {
    "_id": ObjectId("684a75e7b6a725a81f228fc7"),
    "username": "durianchina",
    "firstName": "Piyakorn",
    "lastName": "Suthee",
    "role": "border",
    "farmId": null,
    "password": "$2b$10$wz/VsXwcJ6FvBS5v/tfd5e26li6.fUSimZg004D/I5cHnhKFX8iAK",
    "createdAt": new Date("2025-06-12T06:38:31.188Z"),
    "updatedAt": new Date("2025-06-12T06:38:31.188Z"),
    "__v": 0,
    "houseId": null
  },
  {
    "_id": ObjectId("684a761db6a725a81f228fca"),
    "username": "durianthai",
    "firstName": "Natha",
    "lastName": "Pim",
    "role": "ministry",
    "farmId": null,
    "password": "$2b$10$jYGrbUvDLnnJmoO2EK61C.o/cPgJ7eiXB4wjy5SApdaGiblUgBgt2",
    "createdAt": new Date("2025-06-12T06:39:25.377Z"),
    "updatedAt": new Date("2025-06-12T06:39:25.377Z"),
    "__v": 0,
    "houseId": null
  }
]);
print('Users data inserted successfully!');

print('YubYuYi database initialization completed successfully!');
print('Summary:');
print('- Created ' + db.farms.countDocuments() + ' farms');
print('- Created ' + db.houses.countDocuments() + ' houses');
print('- Created ' + db.users.countDocuments() + ' users');
print('- Database is ready for use!');
