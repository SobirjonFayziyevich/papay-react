import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";

// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberData } from "../../apiServices/verify";
import { retrieveProcessOrders } from "../../screens/OrdersPage/selector";

// REDUX SELECTOR
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

// const processOrders = [
//   [1, 2, 3],
//   [1, 2, 3],
//   [1, 2, 3],
// ];

export default function ProcessOrders(props: any) {

  // INITIALIZATIONS
  const { processOrders } = useSelector(processOrdersRetriever);

   /** HANDLERS */
 const finishOrderHandler = async (event: any ) => {
  try{
    const order_id = event.target.value;
    const  data = {order_id: order_id, order_status: "FINISHED"};

    if(!verifiedMemberData) { //ocalStorage ichidagi getItem da member_data mavjudmi?
       sweetFailureProvider('Please login first', true);
      }

      let confirmation = window.confirm("Buyurtmani olganizni tasdiqlang?");
      if(confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
       }
   } catch(err) {
     console.log("finishOrderHandler, ERROR:", err);
     sweetErrorHandling(err).then();
   }
};
  
  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order: Order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order?.order_items?.map((item) => {
                 const product: Product = order.product_data.filter(ele => ele._id === item.product_id)[0];
                 const image_path = `${serverApi}/${product?.product_images[0]}`; //[0] product imagedagi imageni 1 chisini chaqirib ber dedim.
                  return (
                    <Box className="ordersName_price">
                      <img src={image_path} className={"orderDishImg"} />
                      <p className="titleDish">{product?.product_name}</p>
                      <Box className="priceBox">
                        <p>${item.item_price}</p>
                        <img src="/icons/Close.svg" />
                        <p>3</p>
                        <img src="/icons/pause.svg" />
                        <p style={{ marginLeft: "15px" }}>${item.item_price * item?.item_quantity}</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total_price_box blue_solid">
                <Box className="boxTotal">
                  <p>mahsulot narxi</p>
                  <p>${order.order_total_amount - order.order_delivery_cost}</p>
                  <img src="/icons/plus.svg" style={{ marginLeft: "20px" }} />
                  <p>Yetkazish hizmati</p>
                  <p>${order.order_delivery_cost}</p>
                  <img src="/icons/pause.svg" style={{ marginLeft: "20px" }} />
                  <p>jami narxi</p>
                  <p>${order.order_total_amount}</p>
                </Box>
                <p className={"data_compl"}>
                  {moment(order.createAt).format ("YY-MM-DD- HH:mm")}
                  </p>
                <Button
                value={order._id}
                onClick={finishOrderHandler}
                  variant="contained"
                  sx={{
                    background: "rgb(2, 136, 209)",
                    color: "rgb(255, 255, 255)",
                    borderRadius: "10px",
                  }}
                >
                  Yakunlash
                </Button>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}