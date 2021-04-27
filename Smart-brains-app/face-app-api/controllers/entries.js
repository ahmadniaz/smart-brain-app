const Clarifai=require('clarifai');

const app= new Clarifai.App({
apiKey:'c563a9d3a43c43d09ad763459e298327'
});

const handleApi=(req, res)=>{

app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data=>{
	res.json(data);
})
.catch(err=>res.status(400).json('Unable to get results'))
}

const handleEntries=(req, res, database)=>{
    const { id }= req.body;

	database('users').where('id', '=', id).increment('entries', 1).returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>res.status(400).json('Unable to update. Please try again.'))
}

module.exports={
handleEntries:handleEntries,
handleApi:handleApi
}