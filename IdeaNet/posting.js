	function gotList(data) //shows all the ideas on the browsing feed
    {	
    	postDisplay = document.getElementById("postSection").innerHTML = ""; //clear all posts (useful for when function is recalled in "clear tags" button)

        allData = data.val() //val function turns data into dictionary
        keyValues = Object.keys(allData);

        multiDigitPosts = [];

       if(keyValues.length > 9)
       { //adjust array to work with multi digit numbers (in firebase ordering/indexing does not work w more than 10 posts)
        	for(key in allData){ //allData must be reordered so that multi digit posts come after single digit posts; unfortunately in firebase idea10 comes before idea2 for example
        		
        		keyNumber = key.match(/\d+/g)[0]; //regex finds number in key
        		if(keyNumber >= 10){ //check if key is multiple digits.
        			multiDigitPosts.push(key); //add multidigit value into array
					keyValues.splice(keyValues.indexOf(key), 1); //delete multidigit value from keyValues (it is to be added back to the end though)
        		};
        	};
        	keyValues.push(...multiDigitPosts); //use of spread operator to put multiDigitPosts at the end of single digit posts
        };


        for (i = 0; (i < keyValues.length) && (i < 18); i++) //this will either draw 18 posts or all the posts in my database (only if it is under 18), if 18 posts is too laggy I could change this number (keyValues.length) to be less
        {   
        	keyName = "Idea" + (i+1);
        	allData[keyName]["number"] = (i+1); //variable is used for adding likes after tag sort
        	dataHold[keyValues[i]] = allData[keyName]; //dataHold should be sorted in the same way as keyValues and only be the length of the # of posts being displayed (this is why it is put in the for loop)
            databaseIdeas = database.ref("Ideas/" + keyValues[i]);
            databaseIdeas.once("value", showPost, errData);
        };

        oldDataHold = dataHold;
    };

    function errData(err)
    {
        console.log("Error!")
        console.log(err)
  	}

    function showPost (data)
    {	
    	try { //if .val() function is possible (initial post display)
   			fullData = data.val();
		} catch { //if .val() function is impossible (after sorting functions)
			fullData = data;
		};

    	ideaNumber ++;

     	browsingData = [fullData.title, fullData.description, fullData.imageURL]; //data that is shown on the browsing page
        if (browsingData[1].length > 120) {
        	browsingData[1] = browsingData[1].substring(0, 120) + "..."; //limit # of characters on browsing page description
        };

        postDisplay = document.getElementById("postSection");

        //create post:

        postButton = document.createElement("button"); //button that opens idea description page (the button is the entire post)
        postButton.className = "openBtn";
        postButton.setAttribute("id", "desBtn" + ideaNumber);
        postButton.setAttribute("data-toggle", "modal");
        postButton.setAttribute("data-target", "#descriptionPage" + ideaNumber);
        postButton.setAttribute("onclick", "(function (){likedAlrdy = reportedAlrdy = false;  window.scrollTo(0, 0);})()");

        postBox = document.createElement("div");
        postBox.className = "box";

        //contents of post:

        postImage = document.createElement("img");
        postImage.setAttribute("alt", "");
        postImage.setAttribute("src", browsingData[2]);
		postImage.className = "image-fit";
		postBox.appendChild(postImage);

		heartIcon = document.createElement("i"); //likes displayed on each post when hovered over
		heartIcon.className = "fa fa-heart"; //turn into icon class
		postBox.appendChild(heartIcon);
		likes = document.createElement("p");
		likes.setAttribute("id", "likesPost" + ideaNumber);
		likes.appendChild(document.createTextNode(dataHold["Idea" + ideaNumber]["likes"])); //description data list not used for this line as it resulted in inconsistencies when used. //you need to put this text in a <p> because text nodes cannot be styled on their own
		likes.className = "likesTxt";
		postBox.appendChild(likes);


		innerText = document.createElement("div"); //div that stores title and description text
		title = document.createElement("h3");
		title.className = "postTitle";
		title.appendChild(document.createTextNode(browsingData[0]))
		innerText.appendChild(title);
		description = document.createElement("p");
		description.appendChild(document.createTextNode(browsingData[1]))
		description.className = "postDesTeaser";
		innerText.appendChild(description);
		innerText.style.transform = "translate(0px,-140px)"; 
		postBox.appendChild(innerText); //adds idea and description text to post box

		postButton.appendChild(postBox);
		postDisplay.appendChild(postButton); //a new post has just been added


		//creating contents on the idea description page:

		descriptionData = [fullData.title, fullData.description, fullData.targetAudience, fullData.importance, fullData.imageURL, fullData.tags]; //data that is shown on the idea description page.

		page = document.createElement("div");
		page.setAttribute("id", "descriptionPage" + ideaNumber); //index each idea description page
		page.className = "description-modal";

		content = document.createElement("div");
		content.className = "description-content";
		page.appendChild(content);

		header = document.createElement("div");
		header.className = "description-header";
		content.appendChild(header);

		titleText = document.createElement("p");
		titleText.appendChild(document.createTextNode(descriptionData[0]));
		titleText.setAttribute("id", "title" + ideaNumber);
		header.appendChild(titleText);
		likesIcon = document.createElement("i");
		likesIcon.className = "fa fa-heart";
		likesIcon.style.visibility = "visible";
		likesIcon.setAttribute("id","likesOnPost" + ideaNumber);

		likesIcon.setAttribute("onclick","addLike(this);");
		header.appendChild(likesIcon);
		likesText = document.createElement("p");
		likesText.setAttribute("id", "likesCount" + ideaNumber);
		likesText.className = "likes-number";
		likesText.appendChild(document.createTextNode(dataHold["Idea" + ideaNumber]["likes"])); //description data list not used for this line as it resulted in inconsistencies when used.
		header.appendChild(likesText);

		body = document.createElement("div");
		body.setAttribute("id","descriptionBody" + ideaNumber)
		body.className = "description-body";

		descriptionTitle = document.createElement("p");
		descriptionTitle.appendChild(document.createTextNode("Description"));
		body.appendChild(descriptionTitle);
		descriptionText = document.createElement("h5");
		descriptionText.appendChild(document.createTextNode(descriptionData[1]));
		body.appendChild(descriptionText);

		audienceTitle = document.createElement("p");
		audienceTitle.appendChild(document.createTextNode("Target Audience"));
		body.appendChild(audienceTitle);
		audienceText = document.createElement("h5");
		audienceText.appendChild(document.createTextNode(descriptionData[2]));
		body.appendChild(audienceText);


		importanceTitle = document.createElement("p");
		importanceTitle.appendChild(document.createTextNode("Importance"));
		body.appendChild(importanceTitle);
		importanceText = document.createElement("h5");
		importanceText.appendChild(document.createTextNode(descriptionData[3]));
		body.appendChild(importanceText);
		body.appendChild(document.createElement("br"));

		image = document.createElement("img");
		image.setAttribute("src", descriptionData[4]);
		image.className = "description-image";
		body.appendChild(image);

		reportBtn = document.createElement("p"); //creating report button
		reportBtn.className = "fa fa-exclamation-triangle";
		reportBtn.appendChild(document.createTextNode("Report "));
		reportBtn.setAttribute("id", "reportButton" + ideaNumber);
		reportBtn.setAttribute("onclick", "reported(this);");
		body.appendChild(reportBtn);

		tagsIcon = document.createElement("i"); //add tags to body (not header because it has seperate styling)
		tagsIcon.className = "fa fa-tags";
		body.appendChild(tagsIcon);
		tags = document.createElement("p");
		tags.className = "tagsTxt";

		if (descriptionData[5]){ //check if entered tags are empty

			tagsText = descriptionData[5].join(", ").replace(/,\s*$/, ""); //turns list of tags into string w vals separated by commas. regex gets rid of trailing comma and any extra spaces
			if  (tagsText.length > 55){
				tagsText = tagsText.substring(0, 55) + "..."; //limit to only 55 chars to make sure it will fit in the header
			};

		};

		tags.appendChild(document.createTextNode(tagsText));
		body.appendChild(tags);

		commentSec = document.createElement("div");
		commentSec.setAttribute("id", "commentList" + ideaNumber);
		commentSec.className = "comment-section";
		body.appendChild(commentSec);
		commentTitle = document.createElement("p");
		commentTitle.appendChild(document.createTextNode("Comments"));
		commentTitle.className = "comment-title";
		body.appendChild(commentTitle);

		//adding comments to post:
		databaseComments = database.ref("Ideas/" + "Idea" + ideaNumber + "/comments");
		databaseComments.once("value", gotComments, errData);

		content.appendChild(body);


		footer = document.createElement("div");
		footer.class = "insertComment";

		inputCom = document.createElement("input");
		inputCom.className = "commentInput";
		inputCom.setAttribute("type", "text");
		inputCom.setAttribute("id", "commentTxt" + ideaNumber);
		inputCom.setAttribute("placeholder", "Add a comment...");
		footer.appendChild(inputCom);
		submitBtn = document.createElement("submit");
		submitBtn.className = "commentSubmit";
		footer.appendChild(submitBtn);
		submitIcon = document.createElement("i")
		submitIcon.className = "fa fa-paper-plane";

		submitBtn.setAttribute("id", "commentSection" + ideaNumber);

		submitBtn.appendChild(submitIcon);
		submitBtn.setAttribute("onclick", "addComment(this)");

		page.append(footer);

		postDisplay.appendChild(page);
    };

    function gotComments(data){ //intial comment display on posts
    	counter ++;
		commentData = data.val();

		allComments = Object.values(commentData);

		commentDisplay(allComments, counter); //put comment drawing in a seperate function because it will have to be called multiple times (e.g. in sorting functions)
	};

	function commentDisplay(allComments, arrayIndex){ //function for whenever comments are displayed

	    ideaComments = document.getElementById("commentList" + arrayIndex);

	    if(ideaComments.hasChildNodes() || !allComments.length){ //check for no comments or if comments were already drawn (e.g. in a sorting function)
	        
	        if(!allComments.length){
	        	ideaComments.appendChild(document.createTextNode("")); //add empty text node to avoid glitch where other posts' comments add to uncommented post
	        };

	        return;
	    };

	    for (j = 0; j < allComments.length; j++){
		    comment = document.createElement("p");
		    comment.className = "idea-comments";
		    comment.appendChild(document.createTextNode(allComments[j]));
		    ideaComments.appendChild(comment);

	     	//fix a bug where long comments go over short comments:

			//bug is solved by adding <br> to ideaComments based on how many lines comment is

			if (allComments[j].length > 45){ //there are approximately 45 characters in a line
				approxLineNumber = String(allComments[j].length/45).charAt(0); //estimation of how many lines comment would take up
				linebreak = document.createElement("br");
				for (k = 0; k < approxLineNumber; k++){
					ideaComments.append(linebreak);
				};
			};
	    };

    };