// Copyright 2024 itdevwu

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//   http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export function getRandomChar(chars) {
    // validate chars
    if (!chars || chars.length === 0) {
        throw new Error('Input for getRandomChar must be a non-empty string');
    }

    const crypto = window.crypto;
    const randomValues = new Uint8Array(1);
    crypto.getRandomValues(randomValues);

    // fix modulo bias
    const maxBias = 256 % chars.length;
    const threshold = 256 - maxBias;
    while (true) {
        crypto.getRandomValues(randomValues);
        const randomByte = randomValues[0];
        if (randomByte < threshold) {
            const randomIndex = randomByte % chars.length;
            return chars[randomIndex];
        }
    }
}

export function getRandomSequence(length, chars) {
    let sequence = '';
    for (let i = 0; i < length; i++) {
        sequence += getRandomChar(chars);
    }
    return sequence;
}

export function getRandomHex(length) {
    const crypto = window.crypto;
    const randomValues = new Uint8Array(length / 8);
    crypto.getRandomValues(randomValues);
    return Array.from(randomValues, byte => byte.toString(16).padStart(2, '0')).join('');
}