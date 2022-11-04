
export const returnDocuments = (snapshot) => {

    const documents = [];

    snapshot.forEach(el => {
        documents.push({
            docId: el.id,
            ...el.data(),
        })
    })


    return documents;
}