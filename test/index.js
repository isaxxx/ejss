const ejss = require('../index');
const test = require('ava');
const path = require('path');
const fs = require('fs-extra');

// test

test('compile HTML - case 001', (t) => {
	return ejss({
		src: 'test/fixtures/case-001/index.ejs',
		options: 'test/fixtures/case-001/options.json'
	}, (str) => {
		t.is(str, fs.readFileSync(path.resolve(__dirname, 'expect/case-001/index.html'), 'UTF-8'));
	});
});

test('compile HTML - case 002', (t) => {
	return ejss({
		src: 'test/fixtures/case-002/about.ejs',
		options: 'test/fixtures/case-002/options.json'
	}, (str) => {
		t.is(str, fs.readFileSync(path.resolve(__dirname, 'expect/case-002/about.html'), 'UTF-8'));
	});
});

test('resolve path - case 003', (t) => {
	return ejss({
		src: 'test/fixtures/case-003/*',
		options: 'test/fixtures/case-003/options.json'
	}, (str) => {
		t.is(str, fs.readFileSync(path.resolve(__dirname, 'expect/case-003/index.html'), 'UTF-8'));
	});
});

test('no file - case 004', (t) => {
	return ejss({
		src: 'test/fixtures/case-004/**/*',
		options: 'test/fixtures/case-004/options.json'
	}, (str) => {
		if (!str) {
			t.pass();
		}
	});
});
