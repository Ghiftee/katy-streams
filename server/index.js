
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.static('./build'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const albums = [
  { //OOTB
    list: [
      {
        id: '1U5SKUvZhbE6ipQGEn3Znj',tracks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    ],
    lead: []
  },
  { //OOTB 2
    list: [
      {
        id: '1U5SKUvZhbE6ipQGEn3Znj',tracks: [13]
      },
      {
        id: '7dAguviHkrNwlfROJ67Ph6',tracks: [12]
      }
    ],
    lead: []
  },
  { //IKAG Norman and Attala Remix
    list: [
      {
        id: '5sAh3w8OUKgdRYtyPThIQj', tracks: []
      }
    ],
    lead: []
  },
  { //TD CC
    list: [
      {
        id: '4zLOhyT4XIzyyl7KoSHWcE', tracks: []
      }
    ],
    lead: []
  },
  { //TD 2
    list: [
      {
        id: '45tPr0lCCGbN2KqFNunc1o', tracks: [12, 14, 15, 16]
      }
    ],
    lead: [1, 2, 3], feat: [0]
  },
  { //PRISM
    list: [
      {
        id: '5MQBzs5YlZlE28mD9yUItn', tracks: []
      }
    ],
    lead: []
  },
  { //Witness
    list: [
      {
        id: '0UlbGi4oAth8s6rwaGSU8Z', tracks: []
      }
    ],
    lead: []
  },
  { //Smile
    list: [
      {
        id: '47zMF6LrXQ8odi6Xv1unC0', tracks: []
      }
    ],
    lead: []
  },
  { //Starstruckk
    list: [
      {
        id: '10xgy5KkSpP3prnygQmFoN', tracks: [12]
      }
    ],
    feat: [0]
  },
  { //If we ever meet again
    list: [
      {
        id: '5FK6borHO8QcztXhXCPn5H', tracks: [8]
      }
    ],
    feat: [0]
  },
  { //White Christmas
    list: [
      {
        id: '4fhTdBtyYkBi1pJpfSLRad', tracks: [9]
      }
    ],
    lead: []
  },
  { //Who you love
    list: [
      {
        id: '712VoD72K500yLhhgqCyVe', tracks: [5]
      }
    ],
    feat: [0]
  },
  { //Legends Never Die
    list: [
      {
        id: '31xzh0WCNKmaQLRJb5mQcC', tracks: [4]
      }
    ],
    feat: [0]
  },
  { //Feels
    list: [
      {
        id: '2HaqChIDc5go3qxVunBDK0', tracks: [7]
      }
    ],
    feat: [0]
  },
  { //Unplugged
    list: [
      {
        id: '1qAoFDC9NoiJ3zD5lst6pG', tracks: []
      }
    ],
    lead: []
  },
  { //Ur so gay EP
    list : [
      {
        id: '7z3dHyhlbYMZ2uUFUNbJaa', tracks: [1, 2]
      }
    ],
    lead: []
  },
  { //Hot n cold (yelle remix)
    list : [
      {
        id: '58WjN295lBQlajYL241P6Y', tracks: [1]
      }
    ],
    lead: []
  },
  { //IKAG 3 Track
    list : [
      {
        id: '4mSHPlhUjWDLsXRn0wIwIB', tracks: [1, 2]
      }
    ],
    lead: []
  },
  { //Hot n cold
    list : [
      {
        id: '4HR0CUur5ucPjpyOYdNJY1', tracks: [1, 2]
      }
    ],
    lead: []
  },
  { //Hot n cold rock version
    list : [
      {
        id: '7t536KbHOO8GOEhHpk0Tyv', tracks: []
      }
    ],
    lead: []
  },
  { // Thinking of you
    list : [
      {
        id: '10yPrx37K92cz5vrWBR9gA', tracks: [1]
      }
    ],
    lead: []
  },
  { //WUIV
    list : [
      {
        id: '2WduoZBxhfVkWkibbJhxS8', tracks: [1, 2, 3, 4, 5]
      }
    ],
    lead: []
  },
  { //WUIV manhattan cliquee bellagio remix
    list : [
      {
        id: '3ZenlGvdNkql8It6tXizkC', tracks: [5]
      }
    ],
    lead: []
  },
  { //California gurls (the remixes)
    list : [
      {
        id: '1rPWxacpHBrLY2sodjAmZE', tracks: []
      }
    ],
    lead: []
  },
  { //California gurls ms main mix ft snoop dog
    list : [
      {
        id: '2oM14OyqBenM0R9pq84ScK', tracks: [1]
      }
    ],
    lead: []
  },
  { //Firework
    list : [
      {
        id: '2oKE3HhxPaI0EsUBajZHJg', tracks: []
      }
    ],
    lead: []
  },
  { //If we ever meet again
    list : [
      {
        id: '7vRchjIhxXVAz5B22h30EY', tracks: []
      }
    ],
    feat: [0, 1, 2, 3]
  },
  { //TD Remix EP
    list : [
      {
        id: '1FRRBe4H2wtYI2jEJpmBYg', tracks: []
      }
    ],
    lead: []
  },
  { //ET
    list : [
      {
        id: '6cV5RZ57OBWPkjNt1D19Hj', tracks: []
      }
    ],
    lead: []
  },
  { //ET Remixes EP
    list : [
      {
        id: '3VpqmLjsrW9kEHHw4IAm9i', tracks: []
      }
    ],
    lead: []
  },
  { //TOTGA Remix bundle
    list : [
      {
        id: '5AuJ6ugigi93QwLklDCflV', tracks: [3]
      }
    ],
    lead: []
  },
  { //TOTGA Remixes
    list : [
      {
        id: '3LeiiR3MXr2gOPg43ZzL94', tracks: [0, 2, 3, 4, 5, 6, 9, 10, 11]
      }
    ],
    lead: []
  },
  { //TOTGA feat B.
    list : [
      {
        id: '0hnaydjZUbzKPn4orAxzCL', tracks: []
      }
    ],
    lead: []
  },
  { //TOTGA R3hab club mix
    list : [
      {
        id: '5GnSAzPR4ZTwu9KSv9Dyly', tracks: [0]
      }
    ],
    lead: []
  },
  { //POM Jacques Lu...
    list : [
      {
        id: '6FvQt4cl6CptRn1U0R2j8b', tracks: []
      }
    ],
    lead: []
  },
  { //Birthday (Cash Cash)
    list : [
      {
        id: '3Fr4iY7qw7KZHxseIwYqIp', tracks: []
      }
    ],
    lead: []
  },
  { //Rise
    list : [
      {
        id: '7oqEOzrJhQkMHvHKEHEMrK', tracks: []
      }
    ],
    lead: []
  },
  { //Rise remixes
    list : [
      {
        id: '4Z280iRLhrqePZNblTYyEY', tracks: []
      }
    ],
    lead: []
  },
  { //CTTR Hot chip remix
    list : [
      {
        id: '5F1lG0zd72qY4dU57JmEPn', tracks: []
      }
    ],
    lead: []
  },
  { //CTTR Oliver Heldens
    list : [
      {
        id: '4XpOKbdbS8MtpN8z2c0dtW', tracks: []
      }
    ],
    lead: []
  },
  { //CTTR Feat. Lil Yatchy
    list : [
      {
        id: '2mAoxdlQ6zsGL1vFbB8iNB', tracks: []
      }
    ],
    lead: []
  },
  { //Bon Appetit 3LAU Remix
    list : [
      {
        id: '12AWGZH31AHqTjk2ykcwjS', tracks: []
      }
    ],
    lead: []
  },
  { //Bon Appetit MUNA Remix
    list : [
      {
        id: '60l6w74hVfqDboeNacX7RW', tracks: []
      }
    ],
    lead: []
  },
  { //Bon Appetit Martin Jensen Remix
    list : [
      {
        id: '5rsuqGrc8DygDe3O9RspRQ', tracks: []
      }
    ],
    lead: []
  },
  { //Bon Appetit Aslove remix
    list : [
      {
        id: '6zfUk8p1TPme6N2qaxhg2B', tracks: []
      }
    ],
    lead: []
  },
  { //Bon appetit amir afargan remix
    list : [
      {
        id: '7fgekMWXztBSdtad6f0PYD', tracks: []
      }
    ],
    lead: []
  },
  { //Swish Swish cheat codes remix
    list : [
      {
        id: '6Ywa1l4N8OoewTJPipVe46', tracks: []
      }
    ],
    lead: []
  },
  { //Swish swish valentino khan remix
    list : [
      {
        id: '4nBHxbpFjEtPuxif8qf7pv', tracks: []
      }
    ],
    lead: []
  },
  { //Swish Swish blonde remix
    list : [
      {
        id: '6ble6YnRhxaCaQmeYjaHNJ', tracks: []
      }
    ],
    lead: []
  },
  { //Waving through a window
    list : [
      {
        id: '6BabrVf6FzOZVIZsvpZasb', tracks: []
      }
    ],
    lead: []
  },
  { //Cozy Litle Christmas
    list : [
      {
        id: '5IxObv8TvRsYE6DGKnbrXn', tracks: []
      }
    ],
    lead: []
  },
  { //365
    list : [
      {
        id: '7DMS5dzWQu7R3D59CKw4TA', tracks: []
      }
    ],
    lead: []
  },
  { //365 remixes
    list : [
      {
        id: '7gTwELYieNEJjBhmPvOm71', tracks: []
      }
    ],
    lead: []
  },
  { //Con calma remix
    list : [
      {
        id: '5lJogLNbwElUSdBmmf8VQB', tracks: []
      }
    ],
    feat: [0]
  },
  { //NRO Rehab remix
    list : [
      {
        id: '7INHYSeusaFlyrHSNxm8qH', tracks: []
      }
    ],
    lead: []
  },
  { //NRO Syn cole remix
    list : [
      {
        id: '6eZLMbytOZ4xBNKLVqgXyR', tracks: []
      }
    ],
    lead: []
  },
  { //NRO Wow and flutter remix
    list : [
      {
        id: '6mz95QqmEg8dtSMukjbKTp', tracks: []
      }
    ],
    lead: []
  },
  { //Small talk
    list : [
      {
        id: '5FOy9CM3AZs86TIK7fsJTV', tracks: []
      }
    ],
    lead: []
  },
  { //Small talk lost kings remix
    list : [
      {
        id: '32MI2kSHvHvXZLdOqZ3RcJ', tracks: []
      }
    ],
    lead: []
  },
  { //Small talk sofi tukker remix
    list : [
      {
        id: '0LJe9wjQloxWKHFcGmQuNI', tracks: []
      }
    ],
    lead: []
  },
  { //Small talk white panda remix
    list : [
      {
        id: '4EMXkvH1Pq6WjYYo1ZLO7e', tracks: []
      }
    ],
    lead: []
  },
  { //HIH Kandy remix
    list : [
      {
        id: '2ptDoWK5hL9gzZ3SXLSVmX', tracks: []
      }
    ],
    lead: []
  },
  { //HIH win and woo remix
    list : [
      {
        id: '3xBE0GkMrFRqEfKTGOYFcF', tracks: []
      }
    ],
    lead: []
  },
  { //Never worn white
    list : [
      {
        id: '0Gubs5k8ay34m9a0yiliRa', tracks: []
      }
    ],
    lead: []
  },
  { //Daisies MK remix
    list : [
      {
        id: '0wZb2kpOOrxfKwZrK9aVV7', tracks: []
      }
    ],
    lead: []
  },
  { //Daisies Oliver heldens remix
    list : [
      {
        id: '6mGYbuFPC71RSBBSiBbHB0', tracks: []
      }
    ],
    lead: []
  },
  { //Daisies acoustic
    list : [
      {
        id: '6RY76U2nPOnRdR2aZ95KIK', tracks: []
      }
    ],
    lead: []
  },
  { //Smile (giordio moroder remix)
    list : [
      {
        id: '7mACKWAFfDrMHmtjmaRVz6', tracks: []
      }
    ],
    lead: []
  },
  { //Smile (Joel corry remix)
    list : [
      {
        id: '7c47yayjXtwCHIz9fKdUkn', tracks: []
      }
    ],
    lead: []
  },
  { //Smile (M22 Remix)
    list : [
      {
        id: '1zWTqN1kSs4420dq2tqUzo', tracks: []
      }
    ],
    lead: []
  },
  { //Smile (Marshall Jefferson remix)
    list : [
      {
        id: '0lI87XMzeWPajplpYCVHzl', tracks: []
      }
    ],
    lead: []
  },
  { //Smile tough love remix
    list : [
      {
        id: '44jGhxZdA51umYagLd0hnA', tracks: []
      }
    ],
    lead: []
  },
  { //Camp Katy
    list : [
      {
        id: '5ImEgzmMKO9NAnXRTclK6X', tracks: []
      }
    ],
    lead: [], ignore: true
  },
  { //Scorpio SZN
    list : [
      {
        id: '6qZ5OAEVumaniVTF2Sumga', tracks: []
      }
    ],
    lead: [], ignore: true
  },
  { //Empowered
    list : [
      {
        id: '3YiQ8eGpgEaOJDdNf6eVFs', tracks: []
      }
    ],
    lead: [], ignore: true
  },
  { //Resilient remix
    list : [
      {
        id: '7hmFzviCSViV9Y9VJvlfYB', tracks: []
      }
    ],
    lead: []
  },
  { //Cosmic energy
    list : [
      {
        id: '3MXubEDnkXIaacR9an5d9e', tracks: []
      }
    ],
    lead: [], ignore: true
  },
  { //CAIL remix
    list : [
      {
        id: '6a74WD13saUvUB52D62NV0', tracks: []
      }
    ],
    lead: []
  },
  { //Electric
    list : [
      {
        id: '2kjyPzcMPYUZlB9CJzu10f', tracks: []
      }
    ],
    lead: []
  },
  // { //Future Nostalgia
  //   list : [
  //     {
  //       id: '7fJJK56U9fHixgO0HQkhtI', tracks: []
  //     }
  //   ],
  //   lead: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,], feat: [10],
  // },
];

let db;
let updateStarted = false;

function getStreamTotal(album, skips)
{
  let tmp = JSON.parse(JSON.stringify(album));
  if (skips) {
    skips.forEach((x) => tmp.streams[x] = null)
  }

  let total = 0;
  tmp.streams.forEach((x) => total += x ? x.playcount : 0);
  return total;
}

async function getTotalCount(date) {
  let current = await db.collection('data').findOne({ date: date });
  current = current.streams;

  let previous = await db.collection('data').find({}).sort({_id:-1});
  let newArray = [];
  await previous.forEach(x => newArray.push(x));

  if (newArray[newArray.findIndex((item) => item.date === date) + 1])
  {
    previous = newArray[newArray.findIndex((item) => item.date === date) + 1].streams;
  }
  else {
    previous = false;
  }

  let leadStreams = 0, featuredStreams = 0, leadPrevious = 0, featuredPrevious = 0;
  albums.forEach((album, index) => {
    if (album.lead && album.feat && !album.ignore) {
      leadStreams += getStreamTotal(current[index], album.feat);
      featuredStreams += getStreamTotal(current[index], album.lead);
      if (previous) {
        let entry = previous.find((x) => (x.name == current[index].name) && x.streams.length === current[index].streams.length);
        if (entry){
          leadPrevious += getStreamTotal(entry, album.feat);
          featuredPrevious += getStreamTotal(entry, album.lead); 
        }
      }
    }
    else if (album.lead && !album.ignore) {
      leadStreams += getStreamTotal(current[index], [])
      if (previous) {
        let entry = previous.find((x) => (x.name == current[index].name) && x.streams.length === current[index].streams.length);
        if (entry){
          leadPrevious += getStreamTotal(entry, album.feat);
        }
      }
    }
    else if (album.feat && !album.ignore) {
      featuredStreams += getStreamTotal(current[index], []);
      if (previous) {
        let entry = previous.find((x) => (x.name == current[index].name) && x.streams.length === current[index].streams.length);
        if (entry){
          featuredPrevious += getStreamTotal(entry, album.lead); 
        }
      }
    }
  });

  let retLead, retFeat;
  if (leadPrevious == 0)  retLead = 0;
  else retLead = leadStreams - leadPrevious;
  if (featuredPrevious == 0)  retFeat = 0;
  else retFeat = featuredStreams - featuredPrevious;

  return {lead: leadStreams, feat: featuredStreams, diffLead: retLead, diffFeat: retFeat, total: leadStreams + featuredStreams};
}

async function doUpdate(withCover) {
  if (updateStarted) {
    console.log('Update already in progress');
    return;
  };
  console.log('Updating streams');
  updateStarted = true;

  // Get today's date eg: 30-7-2021
  let date = new Date();
  date.setDate(date.getDate() - 1); //29-7-2021

  let newStreams = {
    date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
    streams: []
  }
  
  // time 00:00 am to 5:00pm
  if (date.getHours() < 17) {
    date.setDate(date.getDate() - 1); // 28-7-2021
    newStreams.date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  let count = await db.collection('data').find({ date: newStreams.date }).count();
  if (count !== 0) {
    console.log('Data for today already exists!');
    updateStarted = false;
    return;
  }

  // If the data does not exist
  // Check if there is difference in streams for two songs on two albums before updating

  // I Kissed a girl and roar
  let ikagLast, roarLast;
  let streamsData = await db.collection('data').find({}).sort({ _id: -1 }).limit(1);
  streamsData = await streamsData.next();
  if (streamsData) {
    ikagLast = streamsData.streams[0].streams[1].playcount; // I kissed a girl is the second song on the first album
    roarLast = streamsData.streams[5].streams[0].playcount; // Roar is the first song on the sixth album
    console.log(ikagLast, roarLast);
  }

  let ikagNew = await fetch(`https://api.t4ils.dev/albumPlayCount?albumid=${albums[0].list[0].id}`);
  ikagNew = await ikagNew.json();
  ikagNew = ikagNew.data.discs[0].tracks[1].playcount;

  let roarNew = await fetch(`https://api.t4ils.dev/albumPlayCount?albumid=${albums[5].list[0].id}`);
  roarNew = await roarNew.json();
  roarNew = roarNew.data.discs[0].tracks[0].playcount;
  console.log(ikagNew, roarNew);

  if (ikagNew === ikagLast || roarLast === roarNew) {
    console.log('Streams are up to date!');
    updateStarted = false;
    return;
  }

  console.log('Fetching today\'s streams')
  let rawData = [];
  for (const album of albums) {
    let albumTracks = [];
    let firstAlbum;
    for (entry in album.list) {
      let data = await fetch(`https://api.t4ils.dev/albumPlayCount?albumid=${album.list[entry].id}`);
      data = await data.json();
      if (entry == 0) {firstAlbum = data;}
      if (album.list[entry].tracks.length === 0) {
        albumTracks.push(...data.data.discs[0].tracks)
      }
      else album.list[entry].tracks.forEach((track) => {
        albumTracks.push(data.data.discs[0].tracks[track])
      });
      console.log(`Fetched ${data.data.name}...`)
    }
    firstAlbum.data.discs[0].tracks = albumTracks;
    rawData.push(firstAlbum);
  }

  if (withCover) {
    console.log('Updating Covers');
    let covers = {data: []};
    rawData.forEach((data) => {
      covers.data.push(data.data.cover);
    });

    await db.collection('covers').deleteOne({});
    await db.collection('covers').insertOne(covers);
    console.log('Updated covers successfully');
  }


  rawData.forEach((data) => {
    let tracks = data.data.discs[0].tracks.map(obj => {return {name: obj.name, playcount: obj.playcount}})
    newData = {
      name: data.data.name,
      streams: tracks,
    }
    newStreams.streams.push(newData);
  });

  await db.collection('data').insertOne(newStreams);
  console.log('Fetched today\'s streams successfully');
  updateStarted = false;

}

app.get('/artistpic', async (req, res) => {
  if (req.headers['x-forwarded-for']) {
    let IP = req.headers['x-forwarded-for'];
    let count = await db.collection('logins').find({IP: IP}).count();
    let data = null;

    if (count == 0)
    {
      data = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_FDUPYVKJ3S7haHsJq0cEBfBLVPJsF&ipAddress=${IP}`);
      data = await data.json();
      data = data.location;
    }
    else {
      let tmp = await db.collection('logins').find({IP: IP});
      tmp = await tmp.next();
      data = tmp.location;
    }

  //  await db.collection('logins').insertOne({date: new Date(), IP: IP, Client: req.headers['user-agent'], location: data});
  }
   res.json({uri: 'https://i.scdn.co/image/ab67616100005174dc9dcb7e4a97b4552e1224d6'});
});

app.get('/covers', async (req, res) => {
  let data = await db.collection('covers').findOne({});
  res.json(data);
});

app.get('/streams', async (req, res) => {
  await doUpdate();

  let date = new Date();
  let dateQuery = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  let count = await db.collection('data').find({ date: dateQuery }).count();
  if (count == 0) {
    date.setDate(date.getDate() - 1);
    dateQuery = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    count = await db.collection('data').find({ date: dateQuery }).count();
  }
  if (count == 0) {
    date.setDate(date.getDate() - 1);
    dateQuery = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    count = await db.collection('data').find({ date: dateQuery }).count();
  }
  if (count == 0) {
    date.setDate(date.getDate() - 1);
    dateQuery = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    count = await db.collection('data').find({ date: dateQuery }).count();
  }
  if (count == 0) {
    res.json({streams: []})
    return;
  }
  
  const today = await db.collection('data').findOne({ date: dateQuery });

  date.setDate(date.getDate() - 1);
  dateQuery = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  count = await db.collection('data').find({ date: dateQuery }).count();

  if (count == 0) {
    res.json({ today });
    return;
  }

  const yesterday = await db.collection('data').findOne({ date: dateQuery });
  today.streams.forEach((album) => {
    let match = yesterday.streams.find(({ name, streams }) => name === album.name && streams.length === album.streams.length);
    if (match && match.streams) {
      album.streams.forEach((song, index) => {
        song.difference = song.playcount - match.streams[index].playcount;
      });
    }
  })

  res.json({today});
})

app.get('/albumhistory', async(req, res) => {

  await doUpdate();

  let albumName = req.query.name.replace('>>>', '&');
  let numSongs = Number(req.query.length);

  let date = req.query.date;
  let result = [];

  let tmpData = await db.collection('data').find({}).sort({_id: -1}).toArray();
  let data = tmpData.filter((entry) => entry.date.endsWith(date));
  let lastDate = data[data.length - 1];

  if (lastDate === undefined) {
    res.json({data: result, name: albumName });
    return;
  }
  let lastDayIndex = tmpData.findIndex(({ _id }) => _id === lastDate._id);
  const lastDay = tmpData[lastDayIndex + 1];

  data.push(lastDay);
  let covers = await db.collection('covers').findOne({});
  
  let coverIndex = undefined;
  await data.forEach((entry) => {
    if (entry !== undefined) {
      let match = entry.streams.find(({ name, streams }) => name === albumName && streams.length === numSongs);
      if (coverIndex === undefined) coverIndex = entry.streams.findIndex(({ name, streams }) => name === albumName && streams.length === numSongs)
      if (match !== undefined) result.push({streams: match.streams, date: entry.date});
    }
  });

  res.json({data: result, name: albumName, cover: covers.data[coverIndex] });

})

app.get('/songh', async(req, res) => {

  await doUpdate();

  let albumName = req.query.name.replace('>>>', '&');
  let numSongs = Number(req.query.length);
  let trackNo = Number(req.query.track);

  let date = req.query.date;
  let result = [];

  let tmpData = await db.collection('data').find({}).sort({_id: -1}).toArray();
  let data = tmpData.filter((entry) => entry.date.endsWith(date));
  let lastDate = data[data.length - 1];

  if (lastDate === undefined) {
    res.json({data: result, name: albumName });
    return;
  }
  let lastDayIndex = tmpData.findIndex(({ _id }) => _id === lastDate._id);
  const lastDay = tmpData[lastDayIndex + 1];

  data.push(lastDay);

  let covers = await db.collection('covers').findOne({});
  
  let coverIndex = undefined;
  await data.forEach((entry) => {
    if (entry !== undefined) {
      let match = entry.streams.find(({ name, streams }) => name === albumName && streams.length === numSongs);
      if (coverIndex === undefined) coverIndex = entry.streams.findIndex(({ name, streams }) => name === albumName && streams.length === numSongs)
      if (match !== undefined) result.push({streams: match.streams[trackNo], date: entry.date});
    }
  });

  res.json({data: result, cover: covers.data[coverIndex] });
})

app.get('/thistory', async (req, res) => {

  await doUpdate();

  let start = req.query.start ? Number(req.query.start) : 0;
  let stop = req.query.stop ? Number(req.query.stop) : 30;
  let result = [];

  let data = await db.collection('data').find({}).sort({_id:-1}).skip(start).limit(stop);
  data = await data.toArray();
  for (const entry of data) {
    let value = await getTotalCount(entry.date);
    value.date = entry.date;
    result.push(value);
  };

  res.json({ data: result})
})

app.get('/totalcount', async (req, res) => {
  await doUpdate();
  let totalCount = await getTotalCount(req.query.date);
  res.json(totalCount);
});

app.get('/msst', async (req, res) => {
  await doUpdate();
  let date = req.query.date;
  let today = await db.collection('data').findOne({ date: date });
  today = today.streams;
  
  let newDate = new Date(date.split('-').reverse().join('-'));
  newDate.setDate(newDate.getDate() - 1);
  let yesDate = `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;

  newDate.setDate(newDate.getDate() - 1);
  const twoDatesAgo = `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;

  let yesterday = await db.collection('data').findOne({ date: yesDate });
  yesterday = yesterday ? yesterday.streams : [];

  let twoDaysAgo = await db.collection('data').findOne({ date: twoDatesAgo });
  twoDaysAgo = twoDaysAgo ? twoDaysAgo.streams : [];
  const covers = await db.collection('covers').findOne({});

  let todayStreams = [];

  today.forEach((album, index) => {
    album.cover = covers.data[index];
    let match = yesterday.find(({ name, streams }) => name === album.name && streams.length === album.streams.length);
    if (match && match.streams) {
      album.streams.forEach((song, index) => {
        song.difference = song.playcount - match.streams[index].playcount;
      });
    }
  })
  today.forEach((album) => {
    album.streams.forEach((song) => {
      let match = todayStreams.find(entry => song.difference === entry.difference && song.playcount === entry.playcount);
      song.cover = album.cover;
      if (!match) todayStreams.push(song);
    })
  });

  todayStreams.sort((a, b) => (a.difference < b.difference) ? 1 : -1);
  todayStreams.forEach((song, index) => song.position = index);

  const yesterdayStreams = [];

  yesterday.forEach((album) => {
    let match = twoDaysAgo.find(({ name, streams }) => name === album.name && streams.length === album.streams.length);
    if (match && match.streams) {
      album.streams.forEach((song, index) => {
        song.difference = song.playcount - match.streams[index].playcount;
      });
    }
  })
  yesterday.forEach((album) => {
    album.streams.forEach((song) => {
      let match = yesterdayStreams.find(entry => song.difference === entry.difference && song.playcount === entry.playcount);
      if (!match) yesterdayStreams.push(song);
    })
  });

  yesterdayStreams.sort((a, b) => (a.difference < b.difference) ? 1 : -1);
  yesterdayStreams.forEach((song, index) => song.position = index);

  todayStreams.forEach((song, index) => {
    const match = yesterdayStreams.find(({ name, playcount }) => 
      name === song.name && song.playcount === playcount + song.difference);
    if (match) {
      song.increment = match.position - song.position;
    }
  });

  res.json({rank : todayStreams});
});

app.get('/mssa', async (req, res) => {
  await doUpdate();
  let today = await db.collection('data').find({}).sort({_id:-1}).limit(1);
  today = await today.next();
  today = today.streams;
  let covers = await db.collection('covers').findOne({});

  let todayStreams = [];
  today.forEach((album, index) => {
    album.streams.forEach((song) => {
      let match = todayStreams.find(entry => song.playcount === entry.playcount && song.name.toLowerCase() === entry.name.toLowerCase());
      song.cover = covers.data[index];
      if (!match) todayStreams.push(song);
    })
  });
  today = null;
  yesterday = null;
  todayStreams.sort((a, b) => (a.playcount < b.playcount) ? 1 : -1);
  res.json({rank : todayStreams});
});

app.get('/*', (req, res) => {
  console.log('Unkwown page requested');
  console.log(path.resolve('./build/index.html'));
  console.log(req.url);
  res.sendFile(path.resolve('./build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const appPort = process.env.PORT || 3001;
const credentials = fs.readFileSync('credentials.txt');
console.log('Connecting to database...');
MongoClient.connect(`mongodb+srv://${credentials}@cluster0.ujqne.mongodb.net/katystreams?retryWrites=true&w=majority`, { useUnifiedTopology: true }, async function (err, client) {
  if (err) 
  {
    console.log('Error connecting to db...', err);
    return;
  }

  db = client.db('katystreams');
  console.log("Database connection established");

  await doUpdate(true);

  // const data = await db.collection('data').find({}).toArray();

  // await db.collection('data').insertMany(data);

  app.listen(appPort, () => {
    console.log('App listening on port ', appPort)
  })

  console.log('App ready');
});