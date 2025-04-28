import { Table } from "antd";

function CategoryList() {
  return (
    <>
      <div>Category List</div>
      <Table columns={columns} dataSource={dataList} onChange={onChange} />
    </>
  );
}

export default CategoryList;
