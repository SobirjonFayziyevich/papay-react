import { TabPanel } from "@mui/joy/TabPanel";
import { Box, Stack } from "@mui/material";

const finishedOrders = [
  [1, 2, 3],
  [1, 2, 3],
];

export default function FinishedOrders(props: any) {
  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.map((item) => {
                  const image_path = "/restaurant/pitsadonar.png";
                  return (
                    <Box className="ordersName_price">
                      <img src={image_path} className={"orderDishImg"} />
                      <p className="titleDish">Pizza</p>
                      <Box className="priceBox">
                        <p>$22</p>
                        <img src="/icons/Close.svg" />
                        <p>2</p>
                        <img src="/icons/pause.svg" />
                        <p style={{ marginLeft: "15px" }}>$44</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total_price_box red_solid">
                <Box className="boxTotal finish_total">
                  <p>mahsulot narxi</p>
                  <p>$24</p>
                  <img src="/icons/plus.svg" style={{ marginLeft: "20px" }} />
                  <p>Yetkazish hizmati</p>
                  <p>$2</p>
                  <img src="/icons/pause.svg" style={{ marginLeft: "20px" }} />
                  <p>jami narxi</p>
                  <p>$26</p>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}