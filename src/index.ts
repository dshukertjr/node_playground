import * as express from 'express'
import * as hubspot from '@hubspot/api-client'

const app: express.Application = express();

app.get('/', function (req, res) {
    res.send('Hello World!!!');
});

app.listen(3000, async () => {
    console.log('Open http://localhost:3000');
    const hubspotClient = new hubspot.Client({
        apiKey: ''
    });
    const res = await hubspotClient.crm.deals.basicApi.create({
        properties: {

        }
    })
    const dealId = '';

    const newDealId = res.body.id
    const associations = await hubspotClient.crm.deals.associationsApi.getAll(dealId, 'companies')
    associations.body.results[0]
    const promisses = associations.body.results.map(result =>
        hubspotClient.crm.deals.associationsApi.create(newDealId, 'companies', result.id, 'Company to deal')
    )
    await Promise.all(promisses)
});