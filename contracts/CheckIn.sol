// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title CheckIn
/// @notice A minimal onchain check-in contract deployed on Monad Testnet.
contract CheckIn {
    /// @notice Number of check-ins recorded for each wallet.
    mapping(address => uint256) public checkInCount;

    /// @notice Total number of check-ins recorded by all wallets.
    uint256 public totalCheckIns;

    event CheckedIn(
        address indexed user,
        uint256 userCheckInCount,
        uint256 totalCheckInCount
    );

    /// @notice Records one check-in for the caller.
    function checkIn() external {
        checkInCount[msg.sender] += 1;
        totalCheckIns += 1;

        emit CheckedIn(
            msg.sender,
            checkInCount[msg.sender],
            totalCheckIns
        );
    }

    /// @notice Returns the caller's current check-in count.
    function getMyCheckIns() external view returns (uint256) {
        return checkInCount[msg.sender];
    }
}
