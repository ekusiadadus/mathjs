import assert from 'assert'
import math from '../../../src/bundleAny'
import approx from '../../../tools/approx'
const pi = math.pi
const complex = math.complex
const matrix = math.matrix
const unit = math.unit
const cosh = math.cosh
const bigmath = math.create({ number: 'BigNumber', precision: 20 })

describe('cosh', function () {
  it('should return the cosh of a boolean', function () {
    approx.equal(cosh(true), 1.5430806348152)
    approx.equal(cosh(false), 1)
  })

  it('should return the cosh of a number', function () {
    approx.equal(cosh(0), 1)
    approx.equal(cosh(pi), 11.591953275522)
    approx.equal(cosh(1), 1.5430806348152)
    approx.equal(cosh(2), 3.7621956910836)
    approx.equal(cosh(3), 10.067661995778)
  })

  it('should return the cosh of a bignumber', function () {
    const coshBig = bigmath.cosh
    const Big = bigmath.bignumber

    const arg1 = Big(-3)
    const arg9 = Big(Infinity)
    const arg10 = Big(-Infinity)
    assert.deepStrictEqual(coshBig(arg1), Big('10.067661995777765842'))
    assert.deepStrictEqual(coshBig(Big(-2)), Big('3.7621956910836314596'))
    assert.deepStrictEqual(coshBig(Big(-1)), Big('1.5430806348152437785'))
    assert.deepStrictEqual(coshBig(Big(0)), Big(1))
    assert.deepStrictEqual(coshBig(Big(1)), Big('1.5430806348152437785'))
    assert.deepStrictEqual(coshBig(Big(2)), Big('3.7621956910836314596'))
    assert.deepStrictEqual(coshBig(Big(3)), Big('10.067661995777765842'))
    assert.deepStrictEqual(coshBig(bigmath.pi).toString(), '11.591953275521520628')
    assert.deepStrictEqual(coshBig(arg9).toString(), 'Infinity')
    assert.deepStrictEqual(coshBig(arg10).toString(), 'Infinity')

    // Ensure args were not changed
    assert.deepStrictEqual(arg1, Big(-3))
    assert.deepStrictEqual(arg9.toString(), 'Infinity')
    assert.deepStrictEqual(arg10.toString(), '-Infinity')
  })

  it('should return the cosh of a complex number', function () {
    approx.deepEqual(cosh(complex('1')), complex(1.5430806348152, 0))
    approx.deepEqual(cosh(complex('i')), complex(0.54030230586814, 0))
    approx.deepEqual(cosh(complex('2 + i')), complex(2.0327230070197, 3.0518977991518))
  })

  it('should return the cosh of an angle', function () {
    approx.equal(cosh(unit('90deg')), 2.5091784786581)
    approx.equal(cosh(unit('-45deg')), 1.324609089252)

    assert(math.isBigNumber(cosh(unit(math.bignumber(90), 'deg'))))
    approx.equal(cosh(unit(math.bignumber(90), 'deg')).toNumber(), 2.5091784786581)

    approx.deepEqual(cosh(math.unit(complex('2 + i'), 'rad')), complex(2.0327230070197, 3.0518977991518))
  })

  it('should throw an error if called with an invalid unit', function () {
    assert.throws(function () { cosh(unit('5 celsius')) })
  })

  it('should throw an error if called with a string', function () {
    assert.throws(function () { cosh('string') })
  })

  const cosh123 = [1.5430806348152, 3.7621956910836, 10.067661995778]

  it('should return the cosh of each element of an array', function () {
    approx.deepEqual(cosh([1, 2, 3]), cosh123)
  })

  it('should return the cosh of each element of a matrix', function () {
    approx.deepEqual(cosh(matrix([1, 2, 3])), matrix(cosh123))
  })

  it('should throw an error in case of invalid number of arguments', function () {
    assert.throws(function () { cosh() }, /TypeError: Too few arguments/)
    assert.throws(function () { cosh(1, 2) }, /TypeError: Too many arguments/)
  })

  it('should LaTeX cosh', function () {
    const expression = math.parse('cosh(1)')
    assert.strictEqual(expression.toTex(), '\\cosh\\left(1\\right)')
  })
})
