import React from "react";
import { FlatList } from 'react-native';
import UserItem from "./user-item";
// import UserActions from "./user-actions";

const UserList = ({ users }) => {
  return (
    // <SwipeableFlatList
    //   data={users}
    //   bounceFirstRowOnMount={true}
    //   maxSwipeDistance={160}
    //   renderItem={UserItem}
    //   renderQuickActions={UserActions}
    // />
    <FlatList
    data={users}
    renderItem={UserItem}
    
/>


  );
};

export default UserList;
