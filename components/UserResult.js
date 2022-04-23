import { Collapse, List } from "antd"
import React from "react"

const { Panel } = Collapse
export default function UserResult({ data }) {
    return (
        <h1>
            <Collapse accordion>
                {data?.map((item, index) => (
                    <Panel key={index} header={item.testName} extra={<p>{item.subject}</p>}>
                        <div className="w-1/2 flex justify-between">
                            <h1>Score</h1>
                            <h1>{item.score}</h1>
                        </div>
                        <div className="w-1/2 flex justify-between">
                            <h1>Percentage</h1>
                            <h1>{item.percentage}</h1>
                        </div>
                        <List
                            header={"Questions"}
                            bordered
                            dataSource={item.result}
                            renderItem={(item, index) => (
                                <List.Item className="flex flex-col space-y-2 justify-between" >
                                    <div className="w-1/2 flex justify-between">
                                        <p>Question</p>
                                        <p>{item.question}</p>
                                    </div>
                                    <div className="w-1/2 flex justify-between">
                                        <p>Seleted Answer</p>
                                        <p>{item.selectedAnswer}</p>
                                    </div>
                                    <div className="w-1/2 flex justify-between">
                                        <p>Correct Answer</p>
                                        <p>{item.correctAnswer}</p>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Panel>
                ))}
            </Collapse>
        </h1>
    )
}