import { useParams } from "react-router";

export default function OrderDetail() {
  const { id } = useParams();
  return <div>OrderDetail {id}</div>;
}
