// Function to delete an article
async function deleteArticle(article) {
    // Find the header and 3 dots button within the article
    const header = article.querySelector('.postHeaderLayout_post_header___tu5E');
    const dotsButton = article.querySelector('.postMenuLayout_icon_menu__YA0ZR');

    // Check if both the header and dots button are present
    if (header && dotsButton) {
        // Click on the 3 dots button to open the dropdown
        dotsButton.click();

        // Wait for a short time to ensure the dropdown is open
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Find and click on the delete button within the third list item
        const deleteButton = article.querySelector('ul > li:nth-child(3) .postMenuItem_button_item__sBY1Y');
        if (deleteButton) {
            deleteButton.click();

            // Add logic to confirm the deletion if needed
            await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed

            // Find and click on the confirmation button
            const confirmButton = document.querySelector('.confirmModal_button_confirm__sqW0L');
            if (confirmButton) {
                confirmButton.click();

                // Wait for the article to be deleted, adjust this as needed
                await new Promise(resolve => setTimeout(resolve, 2000));
            } else {
                console.error('Confirmation button not found for the article:', article.id);
            }
        } else {
            console.error('Delete button not found for the article:', article.id);
        }
    } else {
        console.error('Header or 3 dots button not found for the article:', article.id);
    }
}

// Function to continuously scroll down until there is no more new content and delete articles
async function scrollInfinitelyAndDelete() {
    let previousHeight = 0;

    while (true) {
        // Scroll to the bottom of the page
        window.scrollTo(0, document.body.scrollHeight);

        // Wait for new content to load (you may need to adjust the time)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check if the page height has not changed, indicating no more new content
        if (document.body.scrollHeight === previousHeight) {
            console.log('Reached the end of the page.');
            break;
        }

        // Update the previous height for the next iteration
        previousHeight = document.body.scrollHeight;

        // Select all articles with IDs starting with "article_"
        const articles = document.querySelectorAll('article[id^="article_"]');

        // Loop through each article and delete it
        for (const article of articles) {
            await deleteArticle(article);
        }
    }
}

// Call the function to scroll infinitely and delete articles
scrollInfinitelyAndDelete();
