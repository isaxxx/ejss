/**
 *
 * index
 *
 */

'use strict';

const ejss = require('../index');
const test = require('ava');
const path = require('path');
const fs = require('fs-extra');

test('compile HTML - case 001', (t) => {
	return ejss({
		src: 'test/fixtures/case-001/index.ejs',
		data: 'test/fixtures/case-001/data.json'
	}, (err, str) => {
		if (!err) {
			t.is(str, fs.readFileSync(path.resolve(__dirname, 'expect/case-001/index.html'), 'UTF-8'));
		} else {
			t.fail();
		}
	});
});

test('compile HTML - case 002', (t) => {
	return ejss({
		src: 'test/fixtures/case-002/about.ejs',
		data: 'test/fixtures/case-002/data.json'
	}, (err, str) => {
		if (!err) {
			t.is(str, fs.readFileSync(path.resolve(__dirname, 'expect/case-002/about.html'), 'UTF-8'));
		} else {
			t.fail();
		}
	});
});

test('resolve path - case 003', (t) => {
	return ejss({
		src: 'test/fixtures/case-003/*',
		data: 'test/fixtures/case-003/data.json'
	}, (err, str) => {
		if (!err) {
			t.is(str, fs.readFileSync(path.resolve(__dirname, 'expect/case-003/index.html'), 'UTF-8'));
		} else {
			t.fail();
		}
	});
});

test('no file - case 004', (t) => {
	return ejss({
		src: 'test/fixtures/case-004/**/*',
		data: 'test/fixtures/case-004/data.json',
		log: false
	}, (err, str) => {
		if (err && !str) {
			t.pass();
		} else {
			t.fail();
		}
	});
});

test('lint check - case 005', (t) => {
	return ejss({
		src: 'test/fixtures/case-005/*',
		data: 'test/fixtures/case-005/data.json',
		lint: 'test/fixtures/case-005/.htmlhint',
		log: true
	}, (err, str) => {
		if (!err) {
			t.pass();
		} else {
			t.fail();
		}
	});
});
