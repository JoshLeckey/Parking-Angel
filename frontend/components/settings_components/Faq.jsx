import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

function Faq({ data }) {
    return (
        <ScrollView>
            {data.rows.map((row, index) => (
                <Card key={index} style={{ marginBottom: 10, padding: 10, elevation: 1}}>
                    <Card.Content>
                        <Title style={{ fontSize: 14 }}>{row.title}</Title>
                        <Paragraph style={{ fontSize: 12 }}>{row.content}</Paragraph>
                    </Card.Content>
                </Card>
            ))}
        </ScrollView>
    );
}

export default Faq;