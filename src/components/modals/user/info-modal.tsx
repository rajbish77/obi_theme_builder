import { Button, Form, Input, Modal, Space } from "antd";
import { useEffect } from "react";

type TProps = {
  onClose: () => void;
  show: boolean;
  data: Record<string, any>;
  type: "Vendor" | "User" | "Product" | "Category" | "SubCategory";
  columns: {
    label: string;
    name: string;
  }[];
};

export default function InfoModal(props: TProps) {
  const { show, onClose, data, type, columns } = props;
  const [form] = Form.useForm();
  function closeModal() {
    onClose();
  }
  
  useEffect(() => {
    if(columns && data){
      columns.forEach((col)=>{
        form.setFieldsValue({[col.name]: data[col.name]});
      })
    }
  }, [data,form,columns])

  return (
    <Modal
      onCancel={closeModal}
      open={show}
      title={type + " Info"}
      onOk={closeModal}
      footer={null}
      bodyStyle={{ padding: 0 }}
    >
      <Form
        form={form}
        name="info-modal"
        className="justify-start"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={data}
        autoComplete="off"
      >
        {columns.map((col) => (
          <Form.Item label={col.label} name={col.name} className="text-black">
            <Input disabled/>
          </Form.Item>
        ))}
        <Form.Item className="justify-end" wrapperCol={{ offset: 18}}>
          <Space>
            <Button htmlType="button" onClick={closeModal} >
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
