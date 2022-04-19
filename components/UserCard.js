import React, { useState } from "react";
import { Button, Select } from "antd";
import { db, auth } from "../firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
const { Option } = Select;
const UserCard = ({ user }) => {
  const [superUser, setsuperUser] = useState(user.isSuperUser);
  const saveSettings = async () => {
    try {
      await updateDoc(doc(db, "users", user.id), { isSuperUser: superUser });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async () => {
    try {
      await deleteDoc(doc(db, "users", user.id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col space-y-5 border rounded p-2">
      <div className="flex space-x-4">
        <Button
          type="primary"
          onClick={saveSettings}
          className="bg-blue-400 text-white"
        >
          Save
        </Button>
        <Button onClick={deleteUser} danger>
          Delete
        </Button>
      </div>
      <div className="flex justify-between w-full">
        <label className="w-1/2">User Id:</label>
        <p>{user.id}</p>
      </div>
      <div className="flex justify-between w-full">
        <label className="w-1/2">First Name:</label>
        <p>{user.firstName}</p>
      </div>
      <div className="flex justify-between w-full">
        <label className="w-1/2">Last Name:</label>
        <p>{user.lastName}</p>
      </div>
      <div className="flex justify-between w-full">
        <label className="w-1/2">Email:</label>
        <p>{user.email}</p>
      </div>
      <div className="flex justify-between w-full">
        <label className="w-1/2">Super User:</label>
        <Select
          defaultValue={superUser}
          style={{ width: 120 }}
          onChange={(e) => setsuperUser(e)}
        >
          <Option value={true}>True</Option>
          <Option value={false}>False</Option>
        </Select>
      </div>
    </div>
  );
};

export default UserCard;
