import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBookingByOwner } from '../../store/actions/booking'
import { getAccessToken } from "../../utility/token";
import {
  Body,
  CardItem,
  Container,
  Content,
  Right,
  Text,
  Thumbnail,
  Card,
  Left,
  Button,
  Icon,
} from "native-base";
const ListRequest = () => {
  const user = useSelector((state) => state.user);
  const bookings = useSelector((state) => state.bookings) 
  const dispatch = useDispatch()

  useEffect(() => {
    getAccessToken()
      .then(res => {
        dispatch(getBookingByOwner(res, user._id))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Container>
      <Content>
        <Text>List Request</Text>
        <Card>
          <CardItem style={{ margin: 10 }}>
            <Left>
              <Thumbnail
                square
                large
                source={require("../../assets/images/requestBook.jpg")}
              />
              <Body>
                <Text>Info Langan</Text>
                <Text>e.g jumlah, location dll</Text>
              </Body>
            </Left>
            <Right>
              <Button transparent>
                <Text>Accept</Text>
                <Icon active name="check-square" type="FontAwesome" />
              </Button>
               <Button transparent>
                <Text>Deny</Text>
                <Icon active name="window-close" type="FontAwesome" />
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
}

export default ListRequest
