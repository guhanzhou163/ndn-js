/**
 * This class represents an NDN Data MetaInfo object.
 * Copyright (C) 2016-2017 Regents of the University of California.
 * @author: Jeff Thompson <jefft0@remap.ucla.edu>
 * @author: From ndn-cxx src/security https://github.com/named-data/ndn-cxx
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * A copy of the GNU Lesser General Public License is in the file COPYING.
 */

/**
 * A ValidityPeriod is used in a Data packet's SignatureInfo and represents the
 * begin and end times of a certificate's validity period.
 *
 * Create a new ValidityPeriod object, possibly copying values from another
 * object.
 * @param {ValidityPeriod} value (optional) If value is a ValidityPeriod, copy
 * its values. If value is omitted, reate a default ValidityPeriodLite where the
 * period is not specified.
 * @constructor
 */
var ValidityPeriod = function ValidityPeriod(value)
{
  if (typeof value === 'object' && value instanceof ValidityPeriod) {
    // Copy values.
    this.notBefore_ = value.notBefore_;
    this.notAfter_ = value.notAfter_;
  }
  else
    this.clear();

  this.changeCount_ = 0;
};

exports.ValidityPeriod = ValidityPeriod;

/**
 * Check if the period has been set.
 * @return {boolean} True if the period has been set, false if the period is not
 * specified (after calling the default constructor or clear).
 */
ValidityPeriod.prototype.hasPeriod = function()
{
  return !(this.notBefore_ === Number.MAX_VALUE &&
           this.notAfter_ === -Number.MAX_VALUE);
};

/**
 * Get the beginning of the validity period range.
 * @return {number} The time as milliseconds since Jan 1, 1970 UTC.
 */
ValidityPeriod.prototype.getNotBefore = function() { return this.notBefore_; };

/**
 * Get the end of the validity period range.
 * @return {number} The time as milliseconds since Jan 1, 1970 UTC.
 */
ValidityPeriod.prototype.getNotAfter = function() { return this.notAfter_; };

/** Reset to a default ValidityPeriod where the period is not specified.
 */
ValidityPeriod.prototype.clear = function()
{
  this.notBefore_ = Number.MAX_VALUE;
  this.notAfter_ = -Number.MAX_VALUE;
  ++this.changeCount_;
};

/**
 * Set the validity period.
 * @param {number} notBefore The beginning of the validity period range as
 * milliseconds since Jan 1, 1970 UTC. Note that this is rounded up to the
 * nearest whole second.
 * @param {number} notAfter The end of the validity period range as milliseconds
 * since Jan 1, 1970 UTC. Note that this is rounded down to the nearest whole
 * second.
 * @return {ValidityPeriod} This ValidityPeriod so that you can chain calls to
 * update values.
 */
ValidityPeriod.prototype.setPeriod = function(notBefore, notAfter)
{
  // Round up to the nearest second.
  this.notBefore_ = Math.round(Math.ceil(Math.round(notBefore) / 1000.0) * 1000.0);
  // Round down to the nearest second.
  this.notAfter_ = Math.round(Math.floor(Math.round(notAfter) / 1000.0) * 1000.0);
  ++this.changeCount_;

  return this;
};

/**
 * Check if the time falls within the validity period.
 * @param {number} time The time to check as milliseconds since Jan 1, 1970 UTC.
 * @return {boolean} True if the beginning of the validity period is less than
 * or equal to time and time is less than or equal to the end of the validity
 * period.
 */
ValidityPeriod.prototype.isValid = function(time)
{
  return this.notBefore_ <= time && time <= this.notAfter_;
};

/**
 * Get the change count, which is incremented each time this object is changed.
 * @return {number} The change count.
 */
ValidityPeriod.prototype.getChangeCount = function()
{
  return this.changeCount_;
};
