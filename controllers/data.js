import pug from 'pug';

const compiledFunction = pug.compileFile('../views' );

export const showData = async (req, res) => {
    res.sent("Hello");
}

