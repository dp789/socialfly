const initState = {
    posts: [
        { id: 1, title: 'Hey there!', content: 'Just some dummy text! Nothing to see here. Move on.'},
        { id: 2, title: 'Testing', content: 'Just some dummy text! Nothing to see here. Move on.'},
        { id: 3, title: 'Yo!', content: 'Just some dummy text! Nothing to see here. Move on.'}
    ]
};

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_POST':
            console.log('post created', action.project);
            return state;
        case 'CREATE_POST_FAILED':
            console.log('post failed', action.err);
            return state;
        case 'COMMENT_ADDED':
            console.log('comment added', action.comment);
            return state;
        case 'COMMENT_FAILED':
            console.log('comment failed', action.err);
            return state;
        case 'LIKED_POST':
            console.log('liked post', action.like);
            return state;
        case 'UNLIKED_POST':
            console.log('unliked post');
            return state;
        case 'UNLIKE_POST_FAILED':
            console.log('unlike failed');
            return state;
        default:
            return state;
    }
}

export default projectReducer;