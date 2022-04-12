import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { addProduct } from "../../redux/cartRedux";
import { setTitle } from "../../customHooks";

import Newsletter from "../../components/Newsletter";

import { Add, Remove } from "@material-ui/icons";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import {
	Container,
	IconContainer,
	Wrapper,
	ImgContainer,
	LineBreak,
	Image,
	InfoContainer,
	Title,
	DescContainer,
	Price,
	AddContainer,
	AmountContainer,
	Amount,
	Button,
	Right,
	ListGroup,
	ListItem,
	Icon1,
	Icon2,
	SideIcons,
	Middle,
	Table,
} from "./StyledProduct.jsx";

const Product = () => {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();

	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await publicRequest.get("/products/find/" + id);
				if (res) {
					setProduct(res.data);
					setTitle(res.data.title ? res.data.title : "Product");
				}
			} catch {}
		};
		getProduct();
	}, [id]);

	const handleQuantity = (type) => {
		if (type === "dec") {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			setQuantity(quantity + 1);
		}
	};

	const handleClick = () => {
		dispatch(addProduct({ ...product, quantity }));
	};

	console.log(product);
	return (
		<Container>
			{product.description && (
				<Wrapper>
					<ImgContainer>
						<Image src={product.img} />
					</ImgContainer>
					<Middle>
						<InfoContainer>
							<Title>{product.title}</Title>
							<Price>$ {product.price}</Price>
							<LineBreak />
							<AddContainer>
								<AmountContainer>
									<IconContainer>
										<Remove onClick={() => handleQuantity("dec")} />
									</IconContainer>
									<Amount>{quantity}</Amount>
									<IconContainer>
										<Add onClick={() => handleQuantity("inc")} />
									</IconContainer>
								</AmountContainer>
								<Button onClick={handleClick}>ADD TO CART</Button>
							</AddContainer>
							<LineBreak />
						</InfoContainer>
						<DescContainer>
							<Table className="ms-2" striped bordered hover size="sm">
								<tbody>
									{product.description.split("\n").map((des, index) => {
										const rowData = des.split(":");
										return (
											<tr>
												<td> {rowData[0]} : </td>
												<td> {rowData[1]} </td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</DescContainer>
					</Middle>
					<Right>
						<ListGroup>
							<ListItem>
								<SideIcons>
									<HomeIcon />
								</SideIcons>
								Cash On Delivery
							</ListItem>
							<ListItem>
								<SideIcons>
									<LocalShippingIcon />
								</SideIcons>
								Express Delivery
							</ListItem>
							<ListItem>
								<SideIcons>
									<Icon1>
										<i class="fas fa-shopping-bag"></i>
									</Icon1>
									<Icon2>
										<i class="fas fa-undo-alt"></i>
									</Icon2>
								</SideIcons>
								1 Week Easy Return
							</ListItem>
							<ListItem>
								<IconContainer>
									<SideIcons>
										<i class="far fa-question-circle"></i>
									</SideIcons>
									Contact Us
								</IconContainer>
							</ListItem>
							<ListItem>
								<IconContainer>
									<SideIcons>
										<i class="fas fa-comment-dots"></i>
									</SideIcons>
									FAQ
								</IconContainer>
							</ListItem>
						</ListGroup>
					</Right>
				</Wrapper>
			)}
			<Newsletter />
		</Container>
	);
};

export default Product;
