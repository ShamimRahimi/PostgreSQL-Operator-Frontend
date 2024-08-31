import { useState, useEffect } from 'react';
import { List, Card, Button, Modal, message, Typography } from 'antd';
import axios from 'axios';

const { confirm } = Modal;
const { Title } = Typography;

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
    };

    fetchData();
  }, []);

  const handleDelete = (userId, userName) => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      content: `User: ${userName}`,
      onOk: async () => {
        setUsers(users.filter(user => user.id !== userId));
        message.success(`${userName} has been deleted`);
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
        <Title style={{ textAlign: 'center', marginTop: '10px' }}>
          Users List
        </Title>

      <List style={{ width: "100%" }}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4}}
        dataSource={users}
        renderItem={item => (
            <Card title={item.name} 
            actions={[<Button danger onClick={() => handleDelete(item.id, item.name)}> Delete </Button>,]}
            >
                <p><b>Email:</b> {item.email}</p>
                <p><b>Phone:</b> {item.phone}</p>
            </Card>
        )}
      />
    </div>
  );
};

export default UsersList;