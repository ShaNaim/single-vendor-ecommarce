import React from "react";

import Input from "../Input";
import {
	Container,
	Wrapper,
	WrapperLabel,
	TopicsWrapper,
	IconWrapper,
	DetailsContainer,
	DetailsWrapper,
} from "./Styled.topics";

const Topics = () => {
	return (
		<div>
			<div>
				<WrapperLabel>Topics</WrapperLabel>
				<Wrapper>
					<Container>
						<Wrapper>
							<Input
								onKeyDown={handleKeyDown}
								tabIndex="0"
								inputRef={topicInputRef}
								color="success"
								name="topics"
								label="Topics"
								value={inputValue.topics || ""}
								onChange={handleChange}
								focused={topicInputRef.current.value === "" ? false : true}
							/>
							<IconWrapper color={["#329436", "#7dbba3e1"]}>
								<IconButton
									onClick={addNewTopic}
									color="inherit"
									aria-label="add an alarm"
								>
									<AddIcon />
								</IconButton>
							</IconWrapper>
						</Wrapper>
						<TopicsWrapper>
							{topics.map((topic, index) => {
								return (
									<Topic
										name="topics"
										catId={topic._id}
										handleDelete={handleDelete}
										className="m-1"
										key={index}
										label={topic.name}
									/>
								);
							})}
						</TopicsWrapper>
					</Container>
				</Wrapper>
			</div>
		</div>
	);
};

export default Topics;
