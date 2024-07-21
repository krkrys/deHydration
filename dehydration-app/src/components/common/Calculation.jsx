import {Card, Col, List, Row, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {getDehydrationLevel, getFluidDetails, getFluidNeeded} from "../../api/calculationApi.jsx";

const {Text} = Typography;

const Calculation = ({id}) => {
    const [dehydrationLevel, setDehydrationLevel] = useState('');
    const [fluids, setFluids] = useState(0);
    const [fluidDetails, setFluidDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const dl = await getDehydrationLevel(id);
                setDehydrationLevel(dl);
            } catch (error) {
                console.error('Błąd podczas pobierania poziomu odwodnienia: ', error);
            }
            try {
                const fn = await getFluidNeeded(id);
                setFluids(fn);
            } catch (error) {
                console.error('Błąd podczas pobierania ilości potrzebnych płynów: ', error);
            }
            try {
                const fd = await getFluidDetails(id);
                setFluidDetails(fd);
            } catch (error) {
                console.error('Błąd podczas pobierania szczegółów płynów: ', error);
            }
        };
        fetchData().finally(() => setIsLoading(false));
    }, []);

    const data = (dehydrationLevel) => {
        if (dehydrationLevel !== "Severe") {
            return [
                {
                    title: 'Pierwsza godzina',
                    value: JSON.stringify(fluidDetails.firstHour, null, 2),
                },
                {
                    title: 'Kolejne 4 godziny',
                    value: JSON.stringify(fluidDetails.nextFourHours, null, 2),
                },
                {
                    title: 'Kolejne 8 godzin',
                    value: JSON.stringify(fluidDetails.nextEightHours, null, 2),
                },
                {
                    title: 'Kolejne 12 godzin',
                    value: JSON.stringify(fluidDetails.nextTwelveHours, null, 2),
                },
            ];
        } else {
            return [
                {
                    title: 'Pierwsza godzina',
                    value: JSON.stringify(fluidDetails.firstHour, null, 2),
                },
                {
                    title: 'Kolejna godzina',
                    value: JSON.stringify(fluidDetails.secondHour, null, 2),
                },
                {
                    title: 'Kolejne 8 godzin',
                    value: JSON.stringify(fluidDetails.nextEightHours, null, 2),
                },
                {
                    title: 'Kolejne 16 godzin',
                    value: JSON.stringify(fluidDetails.nextSixteenHours, null, 2),
                },
            ];
        }
    }

    const dehydrationBadge = (d) => {
        if (dehydrationLevel === "Mild") {
            return (<Text type="success" strong>{d}</Text>)
        }
        if (dehydrationLevel === "Moderate") {
            return (<Text type="warning" strong>{d}</Text>)
        } else {
            return (<Text type="danger" strong>{d}</Text>)
        }
    }
    return isLoading ? <p>loading...</p> : (
        <>
            <div style={{
                backgroundColor: "rgb(240, 242, 245)",
                padding: 20,
            }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="Poziom odwodnienia" bordered={false}>
                            {dehydrationBadge(dehydrationLevel)}
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Dzienne zapotrzebowanie na płyny" bordered={false}>
                            {fluids.fluidNeeded.toLocaleString("pl-PL")} ml
                        </Card>
                    </Col>
                </Row>
                <List
                    style={{paddingTop: 20}}
                    grid={{
                        gutter: 16,
                        column: 4,
                    }}
                    dataSource={data(dehydrationLevel)}
                    renderItem={(item) => (
                        <List.Item>
                            <Card title={item.title} style={{height: 220}}>
                                <pre>{item.value}</pre>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </>);
};
export default Calculation;